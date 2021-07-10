terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.50.0"
    }
  }
}

provider "google" {
  region = "asia-northeast1"
}

module "project-factory" {
  source  = "terraform-google-modules/project-factory/google"
  version = "11.0.0"

  name              = "storage-example"
  random_project_id = true
  org_id            = var.org_id
  billing_account   = var.billing_account
  folder_id         = var.folder_id

  activate_apis = [
    "iam.googleapis.com"
  ]
}

resource "google_service_account" "storage_client" {
  project      = module.project-factory.project_id
  account_id   = "storage-client"
  display_name = "cloud storage for example"
}

resource "google_project_iam_member" "service_account_user" {
  project = module.project-factory.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.storage_client.email}"
}

resource "google_project_iam_member" "object_manager" {
  project = module.project-factory.project_id
  role    = "roles/storage.objectAdmin"
  member  = "serviceAccount:${google_service_account.storage_client.email}"
}

resource "google_project_iam_member" "service_account_token_creator" {
  project = module.project-factory.project_id
  role    = "roles/iam.serviceAccountTokenCreator"
  member  = "serviceAccount:${google_service_account.storage_client.email}"
}

resource "google_storage_bucket" "private-images" {
  project  = module.project-factory.project_id
  name     = "private-images-${module.project-factory.project_id}"
  location = "asia-northeast1"

  force_destroy = true

  cors {
    origin          = ["http://localhost:3000"]
    method          = ["POST", "PUT", "DELETE"]
    response_header = ["*"]
  }
}

resource "google_storage_bucket" "public-images" {
  project  = module.project-factory.project_id
  name     = "public-images-${module.project-factory.project_id}"
  location = "asia-northeast1"

  force_destroy = true
}

resource "google_compute_backend_bucket" "cdn-backend-bucket" {
  project     = module.project-factory.project_id
  name        = "backend-${google_storage_bucket.public-images.name}"
  bucket_name = "public-images-${module.project-factory.project_id}"
  enable_cdn  = true
}

resource "google_compute_url_map" "cdn" {
  project         = module.project-factory.project_id
  name            = "public-images-cdn"
  default_service = google_compute_backend_bucket.cdn-backend-bucket.id
}

resource "google_compute_target_https_proxy" "cdn-proxy" {
  project          = module.project-factory.project_id
  name             = "proxy-${module.project-factory.project_id}"
  url_map          = google_compute_url_map.cdn.id
  ssl_certificates = [google_compute_managed_ssl_certificate.tls.id]
}

resource "google_compute_managed_ssl_certificate" "tls" {
  project  = module.project-factory.project_id
  provider = google-beta
  name     = "public-images-${module.project-factory.project_id}"
  managed {
    domains = [var.domain]
  }
}

resource "google_compute_global_forwarding_rule" "cdn" {
  project    = module.project-factory.project_id
  name       = "public-images-${module.project-factory.project_id}"
  target     = google_compute_target_https_proxy.cdn-proxy.self_link
  port_range = 443
}
