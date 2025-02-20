# pnpm

```sh
# 初始化所有依赖
pnpm install

```

## prisma

```sh
# 生成 prisma client
pnpm prisma generate
# 简单操作
# 直接push到数据库，没有migrate
pnpm prisma db push

# 生成migrate
pnpm prisma migrate dev --name init

```
