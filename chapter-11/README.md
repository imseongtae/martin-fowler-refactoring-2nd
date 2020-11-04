# Chapter 11 - API Refactoring
**API 리팩터링**

모듈과 함수는 소프트웨어를 구성하는 빌딩 블록이며, API는 이 블록들을 끼워 맞추는 연결부다. 이런 API를 이해하기 쉽고 사용하기 쉽게 만드는 일은 중요한 동시에 어렵기도 하다. 그래서 API를 개선하는 방법을 새로 깨달을 때마다 그에 맞게 리팩터링해야 한다.



## table of contents
1. [SEPARATE QUERY FROM MODIFIER](#SEPARATE-QUERY-FROM-MODIFIER)
1. [PARAMETERIZE FUNCTION](#PARAMETERIZE-FUNCTION)
1. [REMOVE FLAG ARGUMENT](#REMOVE-FLAG-ARGUMENT)
1. [PRESERVE WHOLE OBJECT](#PRESERVE-WHOLE-OBJECT)
1. [REPLACE PARAMETER WITH QUERY](#REPLACE-PARAMETER-WITH-QUERY)
1. [REPLACE QUERY WITH PARAMETER](#REPLACE-QUERY-WITH-PARAMETER)
1. [REMOVE SETTING METHOD](#REMOVE-SETTING-METHOD)

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
[part.01-Separate_Query_From_Modifier](./part.01-Separate_Query_From_Modifier)


**[⬆ back to top](#table-of-contents)**


## PARAMETERIZE FUNCTION
11.2 함수 매개변수화하기

```js
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}
```

```js
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```

### 배경(Motivation)
두 함수의 로직이 아주 비슷하고 단지 리터럴 값만 다르다면, 그 다른 값만 매개변수로 받아 처리하는 함수 하나로 합쳐서 중복을 없앨 수 있다. 이렇게 하면 매개변수 값만 바꿔서 여러 곳에서 쓸 수 있으니 함수의 유용성이 커진다.

#### 왜하는가?
비슷한 로직을 가진 함수의 중복을 없애고, 함수의 유용성을 높이기 위해


### 절차
1. 비슷한 함수 중 하나를 선택한다.
1. 함수 선언 바꾸기로 리터럴들을 매개변수로 추가한다.
1. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
1. 테스트한다.
1. 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 하나 수정할 때마다 테스트한다.
1. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다. 하나 수정할 때마다 테스트한다.


### 코드
[part.02-Parameterize_Function](./part.02-Parameterize_Function)


**[⬆ back to top](#table-of-contents)**


## REMOVE FLAG ARGUMENT
11.3 플래그 인수 제거하기

```js
function setDimension(name, value) {
  if (name === 'height') {
    this._height = value;
    return;
  }
  if (name === 'width') {
    this._width = value;
    return;
  }
}
```

```js
function setHeight(value) { this._height = value; }
function setWidth(value) { this._width = value; }
```

### 배경(Motivation)
`플래그 인수(Flag Argument)`란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수다. 

#### 왜하는가?



### 절차
1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.
1. 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.


### 코드
[part.03-Remove_Flag_Argument](./part.03-Remove_Flag_Argument)

**[⬆ back to top](#table-of-contents)**



## PRESERVE WHOLE OBJECT
11.4 객체 통째로 넘기기

```js
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high
if (aPlan.withinRange(low, high)) {}
```

```js
if (aPlan.withinRange(aRoom.daysTempRange)) {}
```

### 배경(Motivation)
하나의 레코드에서 값 두어 개를 가져와 인수로 넘기는 코드를 보면, 나는 그 값들 대신 레코드를 통째로 넘기고, 함수 본문에서 필요한 값들을 꺼내 쓰도록 수정하곤 한다.

레코드를 통째로 넘기면 변화에 대응하기 쉽다. 예컨대 그 함수가 더 다양한 데이터를 사용하도록 바뀌어도 매개변수 목록을 수정할 필요가 없다.

- 함수가 더 다양한 데이터를 사용하도록 바뀌어도 매개변수 목록을 수정할 필요가 없다. 
- 매개변수 목록이 짧아져, 함수 사용이 더 쉬워짐
- 레코드에 담긴 데이터 중 일부를 받는 함수가 여러 개라면 같은 데이터를 사용하는 부분이 있을텐데, 이 부분에 대해 로직 중복을 없앨 수 있다. 


#### 왜하는가?
레코드를 통째로 넘기면 변화에 대응하기 쉽다.


### 절차
1. 매개변수들을 원하는 형태로 받는 빈 함수를 만든다.
1. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다.
1. 정적 검사를 수행한다.
1. 모든 호출자가 새 함수를 사용하게 수정하낟. 하나씩 수정하며 테스트하자.
1. 호출자를 모두 수정했다면 원래 함수를 인라인한다.
1. 새 함수의 이름을 적절히 수정하고 모둔 호출자에 반영한다.


### 코드
[part.04-Preserve_Whole_Object](./part.04-Preserve_Whole_Object)


**[⬆ back to top](#table-of-contents)**



## REPLACE PARAMETER WITH QUERY
11.5 매개 변수를 질의 함수로 바꾸기


```js
availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) {
  // calculate vacation
}
```

```js
availableVacation(anEmployee);

function availableVacation(anEmployee) {
  // calculate vacation
  const grade = anEmployee.grade;
}
```

### 배경(Motivation)
피호출 함수가 스스로 쉽게 결정할 수 있는 값을 매개변수로 건네는 것도 일종의 중복이다. 



#### 왜하는가?
- 함수의 변동 요인을 모아놓은 매개변수 목록의 중복을 피하기 위해
- 목록에서 중복은 피하는 게 좋으며, 짧을수록 이해하기 쉽다.

> margin fowler: 매개변수가 있다면 결정주체가 호출자가 되고, 없다면 피호출 함수가 된다. 나는 습관적으로 호출하는 쪽을 간소하게 만든다. 물론 피호출 함수가 그 역할을 수행하기에 적합할 때만 그렇게 한다.

### 절차
1. 필요하다면 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출해놓는다.
1. 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 매개변수의 값을 만들어주는 표현식을 참조하도록 바꾼다. 하나 수정할 때마다 테스트한다.
1. 함수 선언 바꾸기로 대상 배개변수를 없앤다.


### 코드
[part.05-Replace_Parameter_With_Query](./part.05-Replace_Parameter_With_Query)

**[⬆ back to top](#table-of-contents)**



## REPLACE QUERY WITH PARAMETER
11.6 질의 함수를 매개변수로 바꾸기

```js
targetTemperature(aPlan)

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
  // rest of function
}
```

```js
targetTemperature(aPlan, currentTemperature)

function targetTemperature(aPlan, currentTemperature) {
  // rest of function
}
```

### 배경(Motivation)
코드를 읽다보면 함수 안에 두기엔 거북한 참조를 발견할 때가 있다. 이 문제는 해당 참조를 매개변수로 바꿔 해결할 수 있다. 참조를 풀어내는 책임을 호출자로 옮기는 것이다.  

- 이런 상황 대부분은 코드의 의존 관계를 바꾸려할 때 벌어진다.  
- 한 시점에 내린 결정이 영원히 옳을 수 없듯이, 프로그램을 더 잘 이해하게 됐을 때 더 나은 쪽으로 개선하기 쉽게 설계해두는 것이 중요하다.



#### 왜하는가?
'질의 함수를 매개변수로 바꾸기' 리팩토링을 활용하면 프로그램의 일부를 순수 함수로 바꿀 수 있으며, 결과적으로 그 부분은 테스트하거나 다루기가 쉬워진다.

결국, 책임 소재를 어디에 배정하느냐의 문제로 귀결된다. 답을 찾기가 쉽지 않으며 항상 정답이 있는 것이 아니므로 프로젝트를 진행하며 균형점이 이리저리 옮겨질 수 있으니 이 리팩터링과는 친해져야 한다.


### 절차
1. 변수 추출하기로 질의 코드를 함수 본문의 나머지 코드와 분리
1. 함수 본문 중 해당 질의를 호출하지 않는 코드들을 별도 함수로 추출
1. 방금 만든 변수를 인라인하여 제거
1. 원래 함수도 인라인한다
1. 새 함수의 이름을 원래 함수의 이름으로 고친다

### 코드
[part.06-Replace_Query_With_Parameter](./part.06-Replace_Query_With_Parameter)


**[⬆ back to top](#table-of-contents)**


## REMOVE SETTING METHOD
11.7 세터 제거하기

```js
class Person {
  get name() { ... }
  set name(aString) { ... }
}
```

```js
class Person {
  get name() { ... }
}
```

### 배경(Motivation)
세터 제거하기 리팩터링이 필요한 두 가지 상황  
1. 사람들이 무조건 접근자 메서드를 통해서만 필드를 다루려고 할 때
1. 클라이언트에서 생성 스크립트를 사용해 객체를 생성할 때다.


#### 왜하는가?
세터들을 제거하여 의도를 더 명확히 하기 위해
- 세터를 제거하면 해당 필드는 오직 생성자에서만 설정되며, 수정하지 않겠다는 의도가 명명백백해짐
- 변경될 가능성이 봉쇄됨


### 절차
1. 설정해야 할 값을 생성자에서 받지 않는다면 그 값을 받을 매개변수를 생성자에서 추가한다(함수 선언 바꾸기). 그런 다음 생성자 안에서 적절한 세터를 호출한다.
1. 생성자 밖에서 세터를 호출하는 곳을 찾아 제거하고, 대신 새로운 생성자를 사용하도록 한다. 하나 수정할 때마다 테스트한다.
1. 세터 메서드를 인라인한다. 가능하다면 해당 필드를 불변으로 만든다.
1. 테스트한다.

### 코드
[part.07-Remove_Setting_Method](./part.07-Remove_Setting_Method)

**[⬆ back to top](#table-of-contents)**
