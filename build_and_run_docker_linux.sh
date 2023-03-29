docker build -f Dockerfile -t clinica-del-norte-access-control:release .
docker run -d --rm -p 5000:80 clinica-del-norte-access-control:release