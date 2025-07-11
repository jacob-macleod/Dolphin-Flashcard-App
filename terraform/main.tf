provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_cloud_run_service" "flashcard_app" {
  name     = "flashcard-app"
  location = var.region

  template {
    spec {
      containers {
        image = var.image_url
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
