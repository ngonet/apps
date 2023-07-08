# NGINX

## deployment

```bash
kubectl create deployment --image=nginx nginx --dry-run=client -o yaml > deployment.yaml
```

## service

```bash
kubectl expose deploy nginx --port=80 --target-port=80 --dry-run=client -o yaml > service.yml
```
