# NGINX

## deployment

```bash
kubectl create deployment nginx --image=nginx --dry-run=client -o yaml > deployment.yaml
```

## expose

```bash
kubectl expose deploy nginx --port=80 --target-port=80 --dry-run=client -o yaml > service.yml
```

## ingressrouter

```bash
export DOMAIN=example.com
```

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: nginx
  namespace: default
spec:
  entryPoints:
    - websecure
  routes:
    - kind: Rule
      match: Host(`nginx.${DOMAIN}`)
      priority: 10
      services:
        - name: nginx
          port: 80
  tls:
    certResolver: default
```
