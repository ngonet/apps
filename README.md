# GETTING STARTED

This section contains the most basic commands for getting a workload running on your cluster.

## create

Create a resource from a file or from stdin.

JSON and YAML formats are accepted.

``Usage``

```bash
kubectl create -f FILENAME
```

``example``

Create a pod using the data in pod.json

```bash
kubectl create -f ./pod.json
```

Create a pod based on the JSON passed into stdin

```bash
cat pod.json | kubectl create -f -
```

## deployment

Create a deployment with the specified name.

``Usage``

```bash
kubectl create deployment NAME --image=image -- [COMMAND] [args...]
```

``example``

Create a deployment named my-dep that runs the busybox image

```bash
kubectl create deployment my-dep --image=busybox
```

Create a deployment with a command

```bash
kubectl create deployment my-dep --image=busybox -- date
```

Create a deployment named my-dep that runs the nginx image with 3 replicas

```bash
kubectl create deployment my-dep --image=nginx --replicas=3
```

## service

Create a service using a specified subcommand.

``Usage``

```bash
kubectl create service
```

``example``

Create a pod using the data in pod.json

```bash
kubectl create -f ./pod.json
```

Create a pod based on the JSON passed into stdin

```bash
cat pod.json | kubectl create -f -
```

## expose

Expose a resource as a new Kubernetes service.

Looks up a deployment, service, replica set, replication controller or pod by name and uses the selector for that resource as the selector for a new service on the specified port. 

Possible resources include (case insensitive):

pod (po), service (svc), replicationcontroller (rc), deployment (deploy), replicaset (rs)

``Usage``

```bash
kubectl expose (-f FILENAME | TYPE NAME) [--port=port] [--protocol=TCP|UDP|SCTP] [--target-port=number-or-name] [--name=name] [--external-ip=external-ip-of-service] [--type=type]
```

``example``

Create a service for a replicated nginx, which serves on port 80 and connects to the containers on port 8000

```bash
kubectl expose rc nginx --port=80 --target-port=8000
```

Create a service for a replication controller identified by type and name specified in "nginx-controller.yaml", which serves on port 80 and connects to the containers on port 8000

```bash
kubectl expose -f nginx-controller.yaml --port=80 --target-port=8000
```

Create a service for a pod valid-pod, which serves on port 444 with the name "frontend"

```bash
kubectl expose pod valid-pod --port=444 --name=frontend
```

Create a second service based on the above service, exposing the container port 8443 as port 443 with the name "nginx-https"

```bash
kubectl expose service nginx --port=443 --target-port=8443 --name=nginx-https
```

Create a service for a replicated streaming application on port 4100 balancing UDP traffic and named 'video-stream'.

```bash
kubectl expose rc streamer --port=4100 --protocol=UDP --name=video-stream
```

Create a service for a replicated nginx using replica set, which serves on port 80 and connects to the containers on port 8000

```bash
kubectl expose rs nginx --port=80 --target-port=8000
```

Create a service for an nginx deployment, which serves on port 80 and connects to the containers on port 8000

```bash
kubectl expose deployment nginx --port=80 --target-port=8000
```

## Traefik & Kubernetes

### Kind: IngressRoute¶

``IngressRoute`` is the CRD implementation of a Traefik HTTP router.

Register the ``IngressRoute`` kind in the Kubernetes cluster before creating ``IngressRoute`` objects.

#### IngressRoute Attributes

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: foo
  namespace: bar
spec:
  entryPoints:                      # [1]
    - foo
  routes:                           # [2]
  - kind: Rule
    match: Host(`test.example.com`) # [3]
    priority: 10                    # [4]
    middlewares:                    # [5]
    - name: middleware1             # [6]
      namespace: default            # [7]
    services:                       # [8]
    - kind: Service
      name: foo
      namespace: default
      passHostHeader: true
      port: 80
      responseForwarding:
        flushInterval: 1ms
      scheme: https
      sticky:
        cookie:
          httpOnly: true
          name: cookie
          secure: true
          sameSite: none
      strategy: RoundRobin
      weight: 10
  tls:                              # [9]
    secretName: supersecret         # [10]
    options:                        # [11]
      name: opt                     # [12]
      namespace: default            # [13]
    certResolver: foo               # [14]
    domains:                        # [15]
    - main: example.net             # [16]
      sans:                         # [17]
      - a.example.net
      - b.example.net
```

<https://doc.traefik.io/traefik/v2.2/routing/providers/kubernetes-crd/#kind-ingressroute>

``Configuration Examples``

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: myingressroute
  namespace: default

spec:
  entryPoints:
    - web

  routes:
  - match: Host(`foo`) && PathPrefix(`/bar`)
    kind: Rule
    services:
    - name: whoami
      port: 80

---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRouteTCP
metadata:
  name: ingressroute.tcp
  namespace: default

spec:
  entryPoints:
    - tcpep
  routes:
  - match: HostSNI(`bar`)
    kind: Rule
    services:
      - name: whoamitcp
        port: 8080

---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRouteUDP
metadata:
  name: ingressroute.udp
  namespace: default

spec:
  entryPoints:
    - fooudp
  routes:
  - kind: Rule
    services:
      - name: whoamiudp
        port: 8080
```
