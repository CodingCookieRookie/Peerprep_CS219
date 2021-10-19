GOOGLE_PROJECT_ID=cs3219-team23-328712

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/cs3219-team23-backend-image \
  --project=$GOOGLE_PROJECT_ID

gcloud beta run deploy cs3219-team23-backend \
  --image gcr.io/$GOOGLE_PROJECT_ID/cs3219-team23-backend-image \
  --platform managed \
  --port=443 \
  --region asia-east1 \
  --project=$GOOGLE_PROJECT_ID