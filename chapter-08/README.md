# MovingFeatures(기능 이동)


## table of contents
1. [8.1 Move Function](#move-function)
1. [8.2 Move Field](#move-field)
1. [8.3 Move Statements into Function](#move-statements-into-function)
1. [8.4 Move Statements to Callers](#move-statements-to-callers)
1. [8.5 Replace Inline Code With Function Call](#replace-inline-code-with-function-call)
1. [8.6 Slide Statements](#slide-statements)
1. [8.7 Split Loop](#split-loop)

---



## Move Function
8.1 함수 옮기기

```js
class Account {
  get overdraftCharge() { ... }
}
```

```js
class AccountType {
  get overdraftCharge() { ... }
}
```

### 배경(Motivation)
좋은 소프트웨어 설계의 핵심은 모듈화가 잘 되어있는지를 뜻하는 모듈성이다. 모듈성이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력이다. 모듈성을 높이려면 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야 한다. 


#### 왜하는가?



### 절차
1. 선택한 함수가 현재 컨텐스트에서 사용 중인 모든 프로그램 요소를 살펴본다. 이 요소들 중에도 함께 옮겨야 할 게 있는지 고민해본다.
1. 선택한 함수가 다형 메서드인지 확인한다.
1. 선택한 함수를 타깃 컨텍스트로 복사한다. 타깃 함수가 새로운 터전에 잘 자리 잡도록 다듬는다.
1. 정적 분석을 수행한다.
1. 소스 컨텐스트에서 타깃 함수를 참조할 방법을 찾아 반영한다.
1. 소스 함수를 타깃 함수의 위임 함수가 되도록 수정한다.
1. 테스트한다.
1. 소스 함수를 인라인할지 고민해본다.


### 코드


**[⬆ back to top](#table-of-contents)**




## Move Field
8.2 필드 옮기기

```js
class Customer {
  get plan() { return this._plan }
  get discountRate() { return this._discountRate; }
}
```

```js
class Customer {
  get plan() { return this._plan }
  get discountRate() { return this.plan.discountRate; }
}
```

### 배경(Motivation)
프로그램의 상당 부분이 동작을 구현하는 코드로 이루어지지만 프로그램의 진짜 힘은 데이터 구조에서 나온다. 주어진 문제에 적합한 데이터 구조를 활용하면 동작 코드는 자연스럽게 단순하고 직관적으로 짜여진다.


#### 왜하는가?
데이터 구조는 중요하지만 제대로 하기가 어렵다. 


### 절차
1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화한다.
1. 테스트한다.
1. 타깃 객체에 필드(와 접근자 메서드들)를 생성한다.
1. 정적 검사를 수행한다. 
1. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인한다.
1. 접근자들이 타깃 필드를 사용하도록 수정한다.
1. 테스트한다.
1. 소스 필드를 제거한다.
1. 테스트한다.


### 코드

- [part.02-Move_Field](./part.02-Move_Field)


**[⬆ back to top](#table-of-contents)**




## Move Statements into Function
8.3 문장을 함수로 옮기기

```js

```

```js

```

### 배경(Motivation)
중복 제거는 코드를 건강하게 관리하는 가장 효과적인 방법 중 하나다.


#### 왜하는가?



### 절차
1. 반복 코드가 함수 호출 부분과 멀리 떨어져 있다면 문장 슬라이드하기를 적용해 근처로 옮긴다. 
1. 타깃 함수를 호출하는 곳이 한 곳뿐이면, 단순히 소스 위치에서 해당 코드를 잘라내어 피호출 함수로 복사하고 테스트한다. 이 경우라면 나머지 단계는 무시한다. 
1. 호출자가 둘 이상이면 호출자 중 하나에서 '타깃 함수 호출 부분과 그 함수로 옮기려는 문장들을 함께' 다른 함수로 추출한다. 추출한 함수에 기억하기 쉬운 임시 이름을 지어준다.
1. 다른 호출자 모두가 방금 추출한 함수를 사용하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
1. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래 함수를 제거한다.
1. 새로운 함수의 이름을 원래 함수의 이름으로 바꿔준다.(함수 이름 바꾸기)


### 코드
[part.03-Move_Statements_into_Function](./part.03-Move_Statements_into_Function)

**[⬆ back to top](#table-of-contents)**



## Move Statements to Callers
8.4 문장을 호출한 곳으로 옮기기

```js
fuction emitPhotoData(outStream, photo) {

}
```

```js

```

### 배경(Motivation)
함수는 프로그래머가 쌓아 올리는 추상화의 기본 빌딩 블록이다. 추상화라는 것이 그 경계를 항상 올바르게 긋기가 만만치 않다. 


#### 왜하는가?
문장을 호출한 곳으로 옮기는 리팩터링을 적용하면 필요할 때마다 독립적으로 수정할 수 있다.


### 절차
1. 호출자가 한두 개 뿐이고, 피호출 함수도 간단한 단순한 상황이면, 피호출 함수의 처음줄을 잘라내어 호출자로 복사해 넣는다. 테스트만 통과하면 이번 리팩터링은 여기서 끝이다.
1. 더 복잡한 상황에서는 이동하지 '않길' 원하는 모든 문장을 함수로 추출한 다음 검색하기 쉬운 임시 이름을 지어준다.
1. 원래 함수를 인라인한다.
1. 추출된 함수의 이름을 원래 함수의 이름으로 변경한다.


### 코드


**[⬆ back to top](#table-of-contents)**



## Replace Inline Code With Function Call
8.5 인라인 코드를 함수 호출로 바꾸기

```js
let appliesToMass = false;
for (const s of states) {
  if (s === 'MA') appliesToMass = true;
}
```

```js
appliesToMass = states.includes('MA');
```

### 배경(Motivation)



#### 왜하는가?
함수를 활용하면 코드를 이해하기 쉬워진다. 동작을 변경할 때도 비슷해 보이는 코드들을 일일이 찾아 수정하는 대신 함수 하나만 수정하면 된다.


### 절차
1. 인라인 코드를 함수 호출로 대체한다.
1. 테스트한다.


### 코드


**[⬆ back to top](#table-of-contents)**



## Slide Statements
8.6 문장 슬라이드하기

```js

```

```js

```

### 배경(Motivation)



#### 왜하는가?



### 절차
1. 코드 조각을 이동할 목표 위치를 찾는다. 코드 조각의 원래 위치와 목표 위치 사이의 코드들을 훑어보면서, 조각을 모으고 나면 동작이 달라지는 코드가 있는지 살핀다. 다음과 같은 간섭이 있다면 이 리팩터링을 포기한다. 
  - 4개의 항목이 있음
1. 코드 조작을 원래 위치에서 잘라내어 목표 위치에 붙여넣는다.
1. 테스트한다.


### 코드


**[⬆ back to top](#table-of-contents)**


## Split Loop
8.7 반복문 쪼개기

```js

```

```js

```

### 배경(Motivation)


반복문을 분리하면 사용하기도 쉬워진다. 한 가지 값만 계산하는 반복문이라면 그 값만 곧바로 반환할 수 있다. 반면 여러 여러 일을 수행하는 반복문이라면 구조체를 반환하거나 지역변수를 활용해야 한다.

반복문을 두 번 실행햐야 하므로 이 리팩터링을 불편해하는 프로그래머도 많다. 다시 한 번 이야기하지만 리팩터링과 최적화를 구분하자. 최적화는 코드를 깔끔히 정리한 이후에 수행하자. 

#### 왜하는가?
종종 반복문 하나에서 두 가지 일을 수행하는 모습을 보게 되는데, 이렇게 하면 반복문을 수정할 때 두 가지 모두를 잘 이해하고 진행해야 한다. 반대로 각각의 반복문을 분리해두면 수정할 동작하나만 이해하면 된다.


### 절차
1. 반복문을 복제해 두 개로 만든다.
1. 반복문이 중복되어 생기는 부수효과를 파악해서 제거한다.
1. 테스트한다.
1. 완료됐으면, 각 반복문을 함수로 추출할지 고민해본다.


### 코드


**[⬆ back to top](#table-of-contents)**


## Replace Loop with Pipeline
8.8 반복문을 파이프라인으로 바꾸기

```js
const names = [];
for (const i of input) {
  if (i.job === 'programmer') {
    names.push(i.name);
  }
}
```

```js
const names = input
  .filter(i => i.job === 'programmer')
  .map(i => i.name)
```

### 배경(Motivation)
언어는 계속해서 더 나은 구조를 제공하는 쪽으로 발전해왔다. 예컨대 파이프라인을 이용하면 처리 과정을 일련의 연산으로 표현할 수 있다. 이때 각 연산은 컬렉션을 입력받아 다른 컬렉션을 내뱉는다.  
대표적인 연산은 `map`과 `filter`이다. `map`은 함수를 사용해 입력 컬렉션의 각 원소를 반환하고, `filter`는 또 다른 함수를 사용해 입력 컬렉션을 필터링해 부분 집합을 만든다. 이 부분 집합은 파이프라인의 다음 단계를 위한 컬렉션으로 쓰인다.



#### 왜하는가?
논리를 파이프라인으로 표현하면 이해가기 훨씬 쉬워진다. 객체가 파이프라인을 따라 흐르며 어떻게 처리되는지를 읽을 수 있기 때문이다.


### 절차
1. 반복문에서 사용하는 컬렉션을 가리키는 변수를 하나 만든다.
1. 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 적절한 컬렉션 파이프라인 연산으로 대체한다. 이때 컬렉션 파이프라인 연산은 `1.`에서 만든 반복문 컬렉션 변수에서 시작하여, 이전 연산의 결과를 기초로 연쇄적으로 수행한다. 하나를 대체할 때마다 테스트한다. 
1. 반복문의 모든 동작을 대체했다면 반복문 자체를 지운다.

### 코드
[part.08-Replace_Loop_with_Pipeline](./part.08-Replace_Loop_with_Pipeline)

**[⬆ back to top](#table-of-contents)**


## Remove Dead Code 
8.9 죽은 코드 제거하기

```js
if (false) {
  doSomethingThatUsedToMatter();
}
```

```js
// Remove Dead Code

```

### 배경(Motivation)
쓰이지 않는 코드 스스로 '절대 호출되지 않으니 무시해도 되는 함수다'라는 신호를 주지 않는다. 그래서 운 나쁜 프로그래머는 이 코드의 동작을 이해하기 위해 코드를 수정했는데도, 기대한 결과가 나오지 않는 이유를 파악하기 위해 시간을 허비하게 된다.


#### 왜하는가?
사용되지 않는 코드가 있다면 그 소프트웨어의 동작을 이해하는데 커다란 걸림돌이 될 수 있다.


### 절차
1. 죽은 코드를 외부에서 참조할 수 있는 경우라면 혹시라도 호출하는 곳이 있는지 확인한다.
1. 없다면 죽은 코드를 제거한다.
1. 테스트한다.


### 코드


**[⬆ back to top](#table-of-contents)**