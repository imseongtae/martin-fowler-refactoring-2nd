# Chapter 12 Dealing with Inheritance
**Chapter 12 상속 다루기**

객체 지향 프로그래밍에서 가장 유명한 특성인 상속은 아주 유용한 동시에 오용하기 쉽다. 더욱이 상속은 발등에 불이 떨어져서야 잘못 사용했음을 알아차리는 경우가 많다.


## table of contents
1. [PULL UP METHOD](#PULL-UP-METHOD)
1. [Pull Up Field](#Pull-Up-Field)
1. [PULL UP CONSTRUCTOR BODY](#PULL-UP-CONSTRUCTOR-BODY)


---


## PULL UP METHOD
12.1 메서드 올리기

```js
class Employee { ... }
class Salesman extends Employee {
  get name() { ... }
}
class Engineer extends Employee {
  get name() { ... }
}
```

```js
class Employee { 
  get name() { ... }
}
class Salesman extends Employee {}
class Engineer extends Employee {}
```

### 배경(Motivation)
중복된 두 메서드가 당장은 문제없이 동작할지라도, 무언가가 중복되었다는 것은 한쪽의 변경이 다른 쪽에는 반영되지 않을 수 있다는 위험을 수반한다. 

메서드 올리기 리팩터링을 가장 적용하기 쉬운 상황은 메서드들의 본문 코드가 똑같을 때다.

#### 왜하는가?
중복 코드 제거를 위해


### 절차
1. 똑같이 동작하는 메서드인지 면밀히 살펴본다.
1. 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서도 호출하고, 참조할 수 있는지 확인한다.
1. 메서드 시그니처가 다르다면 함수 선언 바꾸기로 슈퍼클래스에서 사용하고 싶은 형태로 통일한다. 
1. 슈퍼클래스에 새로운 메서드를 생성하고, 대상 메서드의 코드를 복사해넣는다.
1. 정적 검사를 수행한다.
1. 서브클래스 중 하나의 메서드를 제거한다.
1. 테스트한다.
1. 모든 서브클래스의 메서드가 없어질 때까지 다른 서브클래스의 메서드를 하나씩 제거한다.


### 코드
[part.01-Pull_Up_Method](./part.01-Pull_Up_Method)


**[⬆ back to top](#table-of-contents)**


## Pull Up Field
12.2 필드 올리기  

```java
class Employee { ... }

class Salesperson extends Employee {
  private String name;
}
class Engineer extends Employee {
  private String name;
}
```

```java
class Employee {
  protected String name;
}

class Salesperson extends Employee { ... }
class Engineer extends Employee { ... }
```

### 배경(Motivation)
서브클래스들이 독립적으로 개발되었거나 뒤늦게 하나의 계층구조로 리팩터링된 경우라면 일부 기능이 중복되어 있을 때가 왕왕 있다. 특히 필드가 중복되기 쉽다. 
필드들을 분석한 후 비슷한 방식으로 쓰인다고 판단되면 슈퍼클래스로 끌어올리자

#### 왜하는가?
두 가지 중복을 줄이기 위해  
1. 데이터 중복 선언을 없애고
1. 해당 필드를 사용하는 동작을 서브클래스에서 슈퍼클래스로 옮길 수 있다.


### 절차
1. 후보 필드들을 사용하는 곳 모두가 그 필드들을 똑같은 방식으로 사용하는지 면밀히 살핀다.
1. 필드들의 이름이 각기 다르다면 똑같은 이름으로 바꾼다(필드 이름 바꾸기)
1. 슈퍼클래스에 새로운 필드를 생성한다.
1. 서브클래스의 필드들을 제거한다.
1. 테스트한다. 

### 코드


**[⬆ back to top](#table-of-contents)**


## PULL UP CONSTRUCTOR BODY
12.3 생성자 본문 올리기


```js
class Party { ... }
```

```js

```

### 배경(Motivation)
생성자는 다루기 까다롭다. 일반 메서드와는 많이 달라서, 나는 생성자에서 하는 일에 제약을 두는 편

#### 왜하는가?
생성자는 할 수 있는 일과 호출 순서에 제약이 있어서 조금 다른 식으로 접근해야 하기 때문이다.


### 절차
1. 슈퍼 클래스에 생성자가 없다면 하나 정의한다. 서브클래스의 생성자들에서 이 생성자가 호출되는지 확인한다.
1. 문장 슬라이드하기로 공통 문장 모두를 super() 호출 직후로 옮긴다.
1. 공통 코드를 슈퍼 클래스에 추가하고, 서브클래스들에서는 제거한다. 생성자 매개변수 중 공통 코드에서 참조하는 값들을 모두 super()로 건넨다. 
1. 테스트한다.
1. 생성자 시작 부분으로 옮길 수 없는 공통 코드에는 함수 추출하기와 메서드 올리기를 차례대로 적용한다.


### 코드


**[⬆ back to top](#table-of-contents)**


## PUSH DOWN METHOD
12.4 메서드 내리기

```js
class Employee {
  get quota { ... }
}

class Engineer extends Employee { ... }
class Salesman extends Employee { ... }
```

```js
class Employee { ... }
class Engineer extends Employee { ... }
class Salesman extends Employee {
  get quota { ... }
}
```

### 배경(Motivation)
특정 서브클래스 하나와만 관련된 메서드는 슈퍼클래스에서 제거하고, 해당 서브 클래스에 추가하는 편이 깔끔하다. 다만, 이 리팩터링은 해당 기능을 제공하는 서브클래스가 무엇인지를 호출자가 알고 있는 때만 적용할 수 있다. 그렇지 못한 상황이라면 서브클래스에 따라 다르게 동작하는 슈퍼클래스의 기만적인 조건부 로직을 다형성으로 바꾸어야 한다.

#### 왜하는가?
코드를 정리하기 위해


### 절차
1. 대상 메서드를 모든 서브 클래스에 복사한다.
1. 슈퍼클래스에서 그 메서드를 제거한다.
1. 테스트한다.
1. 이 메서드를 사용하지 않는 모든 서브클래스에서 제거한다. 
1. 테스트한다.


### 코드


**[⬆ back to top](#table-of-contents)**


## PUSH DOWN FIELD
12.5 필드 내리기


```java
class Employee {
  private String quota;
}
```

```java
class Employee { ... }
class Engineer extends Employee { ... }
class Salesman extends Employee {
  protected String quota;
}
```

### 배경(Motivation)
서브클래스 하나(혹은 소수)에서만 사용하는 필드는 해당 서브클래스(들)로 옮긴다.

#### 왜하는가?



### 절차
1. 대상 필드를 모든 서브클래스에 정의한다.
1. 슈퍼클래스에서 그 필드를 제거한다.
1. 테스트한다.
1. 이 필드를 사용하지 않는 모든 서브클래스에서 제거한다.
1. 테스트한다.
### 코드


**[⬆ back to top](#table-of-contents)**


## REPLACE TYPE CODE WITH SUBCLASSES
12.6 타입 코드를 서브클래스로 바꾸기


```js
function createEmployee(name, type) {
  return new Employee(name, type);
}
```

```js
function createEmployee(name, type) {
  switch (type) {
    case "engineer": return new Engineer(name, type);
    case "salesman": return new Salesman(name, type);
    case "manager": return new Manager(name, type);
  }
}
```

### 배경(Motivation)


#### 왜하는가?



### 절차
1. 타입 코드 필드를 자가 캡슐화한다.
1. 타입 코드 값 하나를 선택하여 그 값에 해당하는 서브클래스를 만든다. 타입 코드 게터 메서드를 오버라이드하여 해당 타입 코드의 리터럴 값을 반환하게 한다.
1. 매개변수로 받은 타입 코드와 방금 만든 서브클래스를 매핑하는 선택 로직을 만든다.
1. 테스트한다.
1. 타입 코드 값 각각에 대해 서브클래스 생성과 선택 로직 추가를 반복한다. 클래스 하나가 완성될 때마다 테스트한다.
1. 타입 코드 필드를 제거한다.
1. 테스트한다.
1. 타입 코드 접근자를 이용하는 메서드 모두에 메서드 내리기와 조건부 로직을 다형성으로 바꾸기를 적용한다.


### 코드


**[⬆ back to top](#table-of-contents)**

## REMOVE SUBCLASS
12.7 서브클래스 제거하기

```js
class Person {
  get genderCode() { return 'X'; }
}
class Male extends Person {
  get genderCode() { return 'M'; }
}
class Female extends Person {
  get genderCode() { return 'F'; }
}
```

```js
class Person {
  get genderCode() { return this._genderCode; }
}
```

### 배경(Motivation)
서브클래싱은 원래 데이터 구조와는 다른 변종을 만들거나 종류에 따라 동작이 달라지게 할 수 있는 유용한 매커니즘이지만, 시스템이 성장함에 따라 서브클래스로 만든 변종이 다른 모듈로 이동하거나 완전히 사라지기도 하면서 가치가 바래는 경우 수행한다.

#### 왜하는가?
더 이상 쓰이지 않는 서브클래스를 슈퍼클래스의 필드로 대체하기 위해

### 절차
1. 서브클래스의 생성자를 팩터리 함수로 바꾼다.
1. 서브클래스의 타입을 검사하는 코드가 있다면, 그 검사 코드에 함수 추출하기와 함수 옮기기를 차례로 적용하여 슈퍼클래스로 옮긴다. 하나 변경할 때마다 테스트한다.
1. 서브클래스의 타입을 나타내는 필드를 슈퍼클래스에 만든다.
1. 서브클래스를 참조하는 메서드가 방금 만든 타입 필드를 이용하도록 수정한다.
1. 서브클래스를 지운다.
1. 테스트한다.

### 코드


**[⬆ back to top](#table-of-contents)**