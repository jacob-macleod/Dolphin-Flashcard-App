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


resource "google_cloud_run_service_iam_member" "noauth" {
  location        = google_cloud_run_service.flashcard_app.location
  project         = google_cloud_run_service.flashcard_app.project
  service         = google_cloud_run_service.flashcard_app.name
  role            = "roles/run.invoker"
  member          = "allUsers"
}
