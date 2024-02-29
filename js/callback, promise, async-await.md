# 들어가며...

- JS에서 네트워크통신, 지연, 이벤트처리를 실행하는 함수에 대해서 기다리지 않고 다음 구문을 실행할 수 있는데, 이를 `비동기함수`라고 합니다.
- 비동기함수를 작성하는 방법을 알아봅니다.
  - callback
  - Promise
  - async-await

## 비동기 함수 종류

### 1. callback

- callback함수란, 다른 함수의 파라미터로 전달하여, 실행될 수 있는 함수입니다.

```js
function fn(callback) {
  fetch("https://www.google.com/").then((res) => {
    callback(res);
  });
}

function callback(res) {
  console.log("callback", res);
}

fn(callback);
```

#### 장점

- `delay`이후 실행할 함수(=콜백함수)를 매개변수로 전달하기 때문에, 콜백함수의 교체로 비동기함수의 동작 교체가 쉽습니다.
- 비동기처리를 가능하게 합니다.

#### 단점

- 콜백함수에 이은 콜백함수를 많이 사용하게 되면, 가독성이 많이 떨어지게 됩니다. [콜백지옥](https://newcodingman.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%9C%EB%B0%B1-%EC%A7%80%EC%98%A5CallBackHell)
- 에러 발생 지점 확인과 처리가 어렵습니다.
- 비동기함수의 결과값을 외부에서 확인할 수 없습니다.

> 장점보다 단점이 큽니다.<br/>
> 콜백함수를 이용한 비동기처리는 고전적인 방법으로, 현재는 많이 사용되지 않습니다.

### 2. Promise

- Promise는 callback을 이용한 비동기처리 방법을 개선한 `객체`입니다.
- es6문법

#### 특징

- `대기`, `이행(성공)`, `실패`의 단계로 구분됩니다.
- Promise내부에서 `resolve(성공)`와 `reject(실패)`로 값의 성공과 에러처리를 구분합니다.
- Promise를 사용하는 외부에서 `then(성공)`, `catch(실패)`로 성공/에러를 구분합니다.

```js
function api() {
  return new Promise((resolve, reject) => {
    if (...) resolve("성공");
    else reject("실패");
  });
}

api()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

```

#### 장점

- then과 catch로 에러핸들링이 용이합니다.
- [Promise 체이닝](https://ko.javascript.info/promise-chaining)을 통해, 중첩된 Promise사용이 가능합니다.
- 병렬처리 `Promise.all`사용가능

#### 단점

- es6문법으로, es6미만에서의 지원불가
- 조건 분기에 의해서 Promise체이닝을 이어가는 경우, 가독성이 떨어집니다. [관련글](https://mong-blog.tistory.com/entry/promise%EC%99%80-async-await%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)
- 비동기결과값은 then 함수안에서만 처리가 가능합니다.

> Promise는 callback비동기처리를 많이 개선한 방법으로, 현재도 많이 사용되곤 합니다. <br/>
> 하지만 여러 비동기처리를 할때, 가독성과 에러처리에 대한 부분이 미흡합니다.

### 3. async-await

- async와 await키워드로 Promise를 편하게 사용합니다.
- es8

#### 특징

- `async`는 function 앞에 위치합니다. (async function)
  - **async function은 반드시, Promise를 반환합니다.**
  - Promise가 아닌 것은 Promise로 감싸 반환합니다.
- `await`는 async함수안에서만 동작하며, 비동기처리 대상에 사용합니다.

#### 장점

- Promise then보다 간결합니다.
- 에러 핸들링에 유리합니다.
- 에러의 위치를 찾기 쉽습니다.
- [async await try-catch hell 영상](https://www.youtube.com/shorts/ITogH7lJTyE)

#### 단점

- async함수는 무조건 Promise를 반환하므로, 이에 대한 처리를 항상 해주어야 합니다.
- 비동기 병렬 처리가 어렵습니다.

## 결론

- 비동기 처리를 하는 방법에 있어, callback, Promise, async-await방법에 대해 알아보았습니다.
- 각각에 대해서 정리하자면, 아래와 같습니다.

  1. `callback미사용` - callback을 이용한 비동기처리는 단점이 많아, 사용하지 않는 것이 좋습니다.
  2. `Promise, then/catch` - Promise의 에러처리는 then과 catch로 구분합니다.
  3. `async-await, try/catch` - async-await의 에러처리는 try-catch로 구분합니다.

- `callback < Promise < async-await`<br/>
  > callback을 사용을 자제하며,<br/> > `에러처리가 용이한 async-await`를 주로 사용하며,<br/> > `병렬동시처리가 필요할 때는 Promise`를 사용합니다.

## 참고사이트

- [자바스크립트 콜백 지옥(CallBackHell)](https://newcodingman.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%9C%EB%B0%B1-%EC%A7%80%EC%98%A5CallBackHell)
- [JAVASCRIPT.INFO / Promise 체이닝](https://ko.javascript.info/promise-chaining)
- [promise와 async await의 차이점](https://mong-blog.tistory.com/entry/promise%EC%99%80-async-await%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)
- [JAVASCRIPT.INFO / async와 await](https://ko.javascript.info/async-await)
- [Youtube / async await try-catch hell](https://www.youtube.com/shorts/ITogH7lJTyE)
