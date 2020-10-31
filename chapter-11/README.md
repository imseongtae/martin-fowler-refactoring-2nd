# Chapter 11 - API Refactoring
**API 리팩터링**

모듈과 함수는 소프트웨어를 구성하는 빌딩 블록이며, API는 이 블록들을 끼워 맞추는 연결부다. 이런 API를 이해하기 쉽고 사용하기 쉽게 만드는 일은 중요한 동시에 어렵기도 하다. 그래서 API를 개선하는 방법을 새로 깨달을 때마다 그에 맞게 리팩터링해야 한다.



## table of contents
1. [SEPARATE QUERY FROM MODIFIER](#SEPARATE-QUERY-FROM-MODIFIER)



---


## SEPARATE QUERY FROM MODIFIER
11.1 질의 함수와 변경 함수 분리하기

```js
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
  sendBill();
  return result;
}
```

```js
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

### 배경(Motivation)
`겉보기 부수효과`가 있는 함수와 없는 함수를 명확히 구분하기 위해 `질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다`는 규칙을 따를 수 있다. 이를 `명령-질의 분리`라 한다.


#### 왜하는가?
> 외부에서 관찰할 수 있는 겉보기 부수효과가 전혀 없이 값을 반환해주는 함수를 추구하기 위해

> martin fowler: 나는 값을 반환하면서 부수효과도 있는 함수를 발견하면 상태를 변경하는 부분과 질의하는 부분을 분리하려 시도한다. 무조건이다.


### 절차
1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.
1. 새 질의 함수에서 부수효과를 모두 제거한다.
1. 정적 검사를 수행한다.
1. 원래 함수를 호출하는 곳을 모두 찾아낸다. 호출하는 곳에서 반환 값을 사용한다면 질의 함수를 호출하도록 바꾸고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다. 하나 수정할 때마다 테스트한다. 
1. 원래 함수에서 질의 관련 코드를 제거한다.
1. 테스트한다.


### 코드


**[⬆ back to top](#table-of-contents)**