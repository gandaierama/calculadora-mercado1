
## Description
```bash


curl -X POST 
     -H "date:Sat 27 Jan 2018 17:53:28 GMT" 
     -H "content-md5:MACiECZtnLiNkNS1v5ZCAA=1" 
     -H "content-type:application/x-www-form-urlencoded;charset=utf-8" 
     -H "x-acs-signature-method:HMAC-SHA1" 
     -H "x-acs-signature-nonce:123212345678231234" 
     -H "x-acs-version:2019-03-25"
     -H "accept:application/json" 
     -d "..." 
     "http://imagesearch.cn-shanghai.aliyuncs.com/v2/image/search"


```

URL: ${HOST}/v2/image/add
POST Body:
 {
        "InstanceName": "demoinstance",
        "PicName": "test",
        "CustomContent": "demo content",
        "PicContent": "${Base64ImageContent}",
        "ProductId": "test",
        "IntAttr": "0",
        "StrAttr": "demo str attr"
    }

 -----------   
URL: ${HOST}/v2/image/search
POST Body:

{
        "InstanceName": "demoinstance",
        "PicContent": "${Base64ImageContent}"
}

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
