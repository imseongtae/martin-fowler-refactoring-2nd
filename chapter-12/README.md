# Chapter 12 Dealing with Inheritance
**Chapter 12 상속 다루기**

객체 지향 프로그래밍에서 가장 유명한 특성인 상속은 아주 유용한 동시에 오용하기 쉽다. 더욱이 상속은 발등에 불이 떨어져서야 잘못 사용했음을 알아차리는 경우가 많다.


## table of contents
1. [PULL UP METHOD](#PULL-UP-METHOD)


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