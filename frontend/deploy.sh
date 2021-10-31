GOOGLE_PROJECT_ID=cs3219-team23-328712

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/cs3219-team23-web \
  --project=$GOOGLE_PROJECT_ID

gcloud beta run deploy cs3219-team23-web \
  --image gcr.io/$GOOGLE_PROJECT_ID/cs3219-team23-web \
  --platform managed \
  --port=443 \
  --region asia-east1 \
  --project=$GOOGLE_PROJECT_ID