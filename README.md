# StreetLamp-Frontend

### How to Deploy

1. root path에 `.env` 파일 추가
```dotenv
# 예시
API_URL={{ apiUrl }}
```

2. 필요한 패키지 설치
```bash
$ npm install
```

3. eas-cli 설치
```bash
$ npm install -g eas-cli
```

4. Expo 로그인
```bash
$ eas login
```

5. apk 파일 생성
```bash
$ eas build -p android
```

