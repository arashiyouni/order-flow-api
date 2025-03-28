## 📦 Instalación de dependencias

```bash
$ npm install
```

### 🐋Inicialiar Docker

```bash
docker compose up -d
```

### 🔮 Prisma Client

```bash
npx prisma generate
```

### 🌱 Correr creacion de seed

```bash
npm run setup
```

### 🔌 Enlace de conección de mongo
enviroment: .env

```bash
DATABASE_URL="mongodb://root:prisma@localhost:27017/prisma-mongo?authSource=admin&retryWrites=true&w=majority"
```