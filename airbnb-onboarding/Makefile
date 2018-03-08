VERSION = 1.0.0
BUCKET_URL = gs://widget.picatic.com
FOLDER = slack-checkout/$(VERSION)
LATEST = slack-checkout/latest

deploy:
	@echo "======================================================================"
	@echo "Deploying slack-checkout $(VERSION) on $(BUCKET_URL)"
	@echo "======================================================================"
	-gsutil rm -r ${BUCKET_URL}/${FOLDER}/
	gsutil -h "Cache-Control:public, max-age=60" cp -Z -r -a public-read ./build/* ${BUCKET_URL}/${FOLDER}/
	-gsutil rm -r ${BUCKET_URL}/${LATEST}/
	gsutil -h "Cache-Control:public, max-age=60" cp -Z -r -a public-read ${BUCKET_URL}/${FOLDER}/* ${BUCKET_URL}/${LATEST}/	