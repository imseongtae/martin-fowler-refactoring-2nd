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
1. [REPLACE CONSTRUCTOR WITH FACTORY FUNCTION](#REPLACE-CONSTRUCTOR-WITH-FACTORY-FUNCTION)
1. [Replace Error Code with Exception](#Replace-Error-Code-with-Exception)

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



## REPLACE CONSTRUCTOR WITH FACTORY FUNCTION
11.8 생성자를 팩터리 함수로 바꾸기

```js
leadEngineer = new Employee(document.leadEngineer, 'E');
```

```js
leadEngineer = createEngineer(document.leadEngineer);
```

### 배경(Motivation)
많은 객체지향 언어에서 제공하는 생성자는 객체를 초기화하는 용도의 함수이다.
객체를 생성할 때 주로 생성자를 호출하지만 생성자에는 일반 함수에는 없는 제약이 따라 붙기도 한다.


#### 왜하는가?
생성자를 팩터리 함수로 바꾸기를 사용하면 생성자 제약 조건의 반대 이유로 사용할 수 있지 않을까?  

1. 더 적절한 이름을 사용할 수 있다. 이는 생성자의 이름이 고정되지 않기 때문
1. 일반 함수가 오길 기대하는 자리에 사용할 수 있다. 생성자 호출을 위해 특별한 연산자 `new`를 사용하지 않아도 되므로!


### 절차
1. 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
1. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
1. 하나씩 수정할 때마다 테스트한다.
1. 생성자의 가시 범위가 최소가 되도록 제한한다.


### 코드
- [part.08-Replace_Constructor_With_Factory_Function](./part.08-Replace_Constructor_With_Factory_Function)


**[⬆ back to top](#table-of-contents)**


## REPLACE FUNCTION WITH COMMAND
11.9 함수를 명령으로 바꾸기

```js
function score() {
  let result = 0;
  let healthLevel = 0;
  // 긴 코드 생략
}
```

```js
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  execute (candidate, medicalExam, scoringGuide) {
    this._result = 0;
    this._healthLevel = 0;
    // 긴 코드 생략
  }
}
```

### 배경(Motivation)
함수는 프로그래밍의 기본적인 빌딩 블록 중 하나인데, 이 함수를 함수만을 위한 객체 안으로 캡슐화하면 더 유용해지는 상황이 있다. 이런 객체를 가리켜 명령 객체(혹은 명령)라고 하는데, 명령 객체는 평범한 함수의 매커니즘보다 훨씬 유연하게 함수를 제어하고 표현할 수 있다.

#### 왜하는가?
명령은 평범한 함수 메커니즘보다 훨씬 유연하게 함수를 제어하고, 표현할 수 있다. 

> 명령보다 더 간단한 방식으로는 얻을 수 없는 기능이 필요할 때 명령을 선택! 

- 명령(command)이 최고의 효율을 가질 때만 사용하는 것일까?


### 절차
1. 대상 함수의 기능을 옮길 빈 클래스를 만든다. 클래스 이름은 함수 이름에 기초해 짓는다.
1. 방금 생성한 빈 클래스로 함수를 옮긴다.
  - 리팩터링이 끝날 때까지는 원래 함수를 전달 함수 역할로 남겨두자.
  - 명령 관련 이름은 사용하는 프로그래밍 언어의 명명 규칙을 따른다. 규칙이 딱히 없다면 "execute"나 "call" 같이 명령의 실행 함수에 흔히 쓰이는 이름을 택하자
1. 함수의 인수들 각각은 명령의 필드로 만들어 생성자를 통해 설정할지 고민해본다.


### 코드
- [part.09-Replace_Function_With_Command](./part.09-Replace_Function_With_Command)

**[⬆ back to top](#table-of-contents)**



## REPLACE COMMAND WITH FUNCTION
11.10 명령을 함수로 바꾸기

```js
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }
  execute() {
    return this._customer.rate * this._usage;
  }
}
```

```js
function charge(customer, usage) {
  return customer.rate * usage;
}
```

### 배경(Motivation)
명령 객체는 복잡한 연산을 다룰 수 있는 강력한 매커니즘을 제공한다.


#### 왜하는가?
명령 객체는 복잡한 연산을 다룰 수 있는 강력한 매커니즘을 제공하지만 이련 능력은 공짜가 아니다.
명령은 그저 함수를 하나 호출해 정해진 일을 수행하는 용도로 주로 쓰인다. 이런 상황이고 로직이 크게 복잡하지 않다면 명령 객체는 장점보다 단점이 크니 평범한 함수로 바꿔주는 게 낫다.


### 절차
1. 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드를 함께 함수로 추출한다.
1. 명령의 실행 함수가 호출하는 보조 메서드들 각각을 인라인한다.
1. 함수 선언 바꾸기를 적용하여, 생성자의 매개변수 모두를 명령의 실행 메서드로 옮긴다.
1. 명령의 실행 메서드에서 참조하는 필드들 대신 대응하는 매개변수를 사용하게끔 바꾼다. 하나씩 수정할 때마다 테스트한다.
1. 생성자 호출과 명령의 실행 메서드 호출을 호출자 안으로 인라인한다.
1. 테스트한다. 
1. 죽은 코드 제거하기로 명령 클래스를 없앤다.


### 코드
[part.10-Replace_Command_With_Function](./part.10-Replace_Command_With_Function)

**[⬆ back to top](#table-of-contents)**


## Return Modified Value
11.11 수정된 값 반환하기

```js
let totalAscent = 0;
calculateAscent();

function calculateAscent() {
	for (let i = 1; i < points.length; i++) {
		const verticalChange = points[i].elevation - points[i - 1].elevation;
		totalAscent += verticalChange > 0 ? verticalChange : 0;
	}
}
```

```js
function calculateAscent() {
	let result = 0;
	for (let i = 1; i < points.length; i++) {
		const verticalChange = points[i].elevation - points[i - 1].elevation;
		result += verticalChange > 0 ? verticalChange : 0;
	}
	return result;
}
```

### 배경(Motivation)


#### 왜하는가?
- 데이터가 수정됨을 알려주기 위해서! 
- 데이터가 어떻게 수정되는지 추적하는 일은 매우 어려운 부분이므로, 데이터가 수정

이 리팩터링은 값 하나를 계산한다는 분명한 목적이 있는 함수들에 가장 효과적이다.  
반대로 값 여러 개를 갱신하는 함수에는 효과적이지 않다. 


### 절차
1. 함수가 수정된 값을 반환하게 하여 호출자가 그 값을 자신의 변수에 저장하게 한다.
1. 테스트한다.
1. 피호출 함수 안에 반환할 값을 가리키는 새로운 변수를 선언한다.
1. 테스트한다.
1. 계산이 선언과 동시에 이뤄지도록 통합한다.
1. 테스트한다.
1. 피호출 함수의 변수 이름을 새 역할에 어울리도록 바꿔준다.
1. 테스트한다.

### 코드
[part.11-Return_Modified_Value](./part.11-Return_Modified_Value)

**[⬆ back to top](#table-of-contents)**


## Replace Error Code with Exception
11.12 오류 코드를 예외로 바꾸기

```js
if (data)
  return new ShippingRules(data);
else 
  return -23;
```

```js
if (data)
  return new ShippingRules(data);
else 
  throw new OrderProcessingError(-23);
```

### 배경(Motivation)
내가(마틴 파울러) 프로그래밍을 시작할 당시엔 오류 코드를 사용하는 게 보편적이었다. 함수를 호출하면 언제든 오류가 반환될 수 있었고, 그래서 오류 코드 검사를 빼먹으면 안 됐다. 오류 코드를 검사해서 발생한 오류를 직접 처리하거나 다른 누군가가 처리해주길 기대하며 콜스택 위로 던져보냈다.

예외를 사용하면 오류 코드를 일일이 검사하거나 오류를 식별해 콜스택 위로 던지는 일을 신경쓰지 않아도 된다. 

예외는 정교한 매커니즘이지만 대다수의 다른 정교한 매커니즘과 같이 정확하게 사용할 때만 최고의 효과를 낸다. 


#### 왜하는가?
예외가 최고의 효과를 내기 위해

### 절차
1. 콜스택 상위에서 해당 예외를 처리할 예외 핸들러를 작성한다.
1. 테스트한다.
1. 해당 오류 코드를 대체할 예외와 그 밖의 예외를 구분할 식별 방법을 찾는다.
1. 정적 검사를 수행한다.
1. catch절을 수정하여 직접 처리할 수 있는 예외는 적절히 대처하고, 그렇지 않은 예외는 다시 던진다. 
1. 테스트한다.
1. 오류 코드를 반환하는 곳 모두에서 예외를 던지도록 수정한다. 하나씩 수정할 때마다 테스트한다.
1. 모두 수정했다면 그 오류 코드를 콜스택 위로 전달하는 코드를 모두 제거한다. 하나씩 수정할 때마다 테스트한다.



### 코드
[part.12-Replace_Error_Code_with_Exception](./part.12-Replace_Error_Code_with_Exception)

**[⬆ back to top](#table-of-contents)**



## Replace Exception with Precheck
11.13 예외를 사전확인으로 바꾸기

```java
double getValueForPeriod (int periodNumber) {
  try {
    return values[periodNumber];
  } catch (ArrayIndexOutOfBoundsException e) {
    return 0;
  }
}
```

```java
double getValueForPeriod (int periodNumber) {
  return (periodNumber >= values.length) ? 0 : values[periodNumber];
}
```

### 배경(Motivation)
예외는 프로그래밍의 의미 있는 한 걸음이지만, 예외는 과용되곤 한다. 예외는 '뜻밖의 오류'라는, 말 그대로 예외적으로 동작할 때만 쓰여야 한다. 함수 수행시 문제가 될 수 있는 조건을 함수 호출 전에 검사할 수 있다면, 예외를 던지는 대신 호출하는 곳에서 조건을 검사하도록 해야 한다.

#### 왜하는가?
예외의 과용을 막기 위해서


### 절차
1. 예외를 유발하는 상황을 검사할 수 있는 조건문을 추가한다. catch 블록의 코드를 조건문의 조건절 중 하나로 옮기고, 남은 try 블록의 코드를 다른 조건절로 옮긴다.
1. catch 블록에 어서션을 추가하고 테스트한다.
1. try문과 catch 블록을 제거한다.
1. 테스트한다.

### 코드


**[⬆ back to top](#table-of-contents)**
