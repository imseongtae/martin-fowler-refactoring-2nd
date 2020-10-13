# Organizing Data
하나의 값이 여러 목적으로 사용된다면 혼란과 버그를 낳는다. 그러니 이런 코드를 발견하면 변수 쪼개기를 적용해 용도별로 분리하자. 다른 프로그램 요소와 마찬가지로 변수 이름을 제대로 짓는 일은 까다로우면서도 중요하다. 그래서 변수 이름 바꾸기와는 반드시 친해져야 한다. 한편, 파생 변수를 질의 함수로 바꾸기를 활용하여 변수 자체를 완전히 없애는 게 가장 좋은 해법일 때도 있다.


## table of contents
1. [Split Variable](#split-variable)
1. [Rename Field](#rename-field)
1. [Replace Derived Variable with Query](#replace-derived-variable-with-query)


---

**단축키**  
`cmd + shift + F`



## Split Variable


```js
let temp = 2 * (height + width);
console.log(temp)
temp = height * width
console.log(temp)
```

```js
const perimeter = 2 * (height + width);
console.log(perimeter)
const area = height * width
console.log(area)
```

### 배경(Motivation)
변수는 다양한 용도로 쓰인다. 그중 변수에 값을 여러 번 대입할 수밖에 없는 경우도 있다. 예컨대 for 반복문 안의 루프 변수는 반복문을 한 번 돌 때마다 값이 바뀐다. 수집 변수는 메서드가 동작하는 중간중간 값을 저장한다. 그 외에도 변수는 긴 코드이 결과를 저장했다가 나중에 쉽게 참조하려는 목적으로 흔히 쓰인다. 이런 변수에는 값을 단 한버만 대입해야 한다.

#### 왜하는가?
역할이 둘 이상인 변수가 있다면 쪼개야 한다. 예외는 없다. 역할 하나당 변수 하나다.


### 절차
1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꾼다. 
1. 가능하면 이때 불변으로 선언한다.
1. 이 변수에 두 번째로 값을 대입한느 곳 앞까지의 모든 참조를 새로운 변수 이름으로 바꾼다. 
1. 두 번째 대입 시 변수를 원래 이름으로 다시 선언한다.
1. 테스트한다.
1. 반복한다. 매 반복에서 변수를 새로운 이름으로 선언하고, 다음번 대입 때까지의 모든 참조를 새 변수명으로 바꾼다. 이 과정을 마지막 대입까지 반복한다.


### 코드
- [part.01-Split_Variable](./part.01-Split_Variable)


**[⬆ back to top](#table-of-contents)**



## Rename Field
9.2 필드 이름 바꾸기

```js
class Organization {
  get name() {...}
}
```

```js
class Organization {
  get title() {...}
}
```

### 배경(Motivation)
이름은 중요하다. 그리고 프로그램 곳곳에서 쓰이는 레코드 구조체의 필드 이름들은 특히 더 중요하다. 


#### 왜하는가?
데이터 구조가 중요한 만큼 깔끔하게 관리하는 과정에서 레코드의 필드 이름을 바꾸고 싶을 수 있는데, 클래스에서도 마찬가지이다. 게터와 세터 메서드는 클래스 사용자 입장에서는 필드와 다를 바 없다. 따라서 게터와 세터 이름 바꾸기도 레코드 구조체의 필드 이름 바꾸기와 똑같이 중요하다.


### 절차
1. 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드를 수정한 후 테스트한다. 이후 단계는 필요 없다.
1. 레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화한다.1
1. 캡슐화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정한다.
1. 테스트한다.
1. 생성자의 매개변수 중 필드와 이름이 겹치는 게 있다면 함수 선언 바꾸기로 변경한다.
1. 접근자들의 이름도 바꿔준다.

### 코드
- [part.02-Rename_Field](./part.02-Rename_Field)


**[⬆ back to top](#table-of-contents)**


## Replace Derived Variable with Query


```js

```

```js

```

### 배경(Motivation)
가변 데이터는 소프트에어에 문제를 일으키는 가장 큰 골칫거리에 속한다. 예컨대 한쪽에서 수정한 코드가 연쇄효과를 일으켜 다른 쪽 코드에 원인을 찾기 어려운 어려운 문제를 야기하기도 한다. 그래서 가변 데이터를 배제하기 어려운 현실을 감안하여, 가변 데이터의 유효범위를 가능한 좁혀야 한다고 힘주어 주장해본다.



#### 왜하는가?



### 절차
1. 변수 값이 갱신되는 지점을 모두 찾는다. 필요하면 변수 쪼개기를 활용해 각 갱신 지점에서 변수를 분리한다.
1. 해당 변수의 값을 계산해주는 함수를 만든다.
1. 해당 변수가 사용되는 모든 곳에 어서션을 추가하여 함수의 계산 결과가 변수의 값과 같은지 확인한다.
1. 테스트한다.
1. 변수를 읽는 코드를 모두 함수 호출로 대체한다.
1. 테스트한다.
1. 변수를 선언하고, 갱신하는 코드를 '죽은 코드 제거하기'로 없앤다.

### 코드
- [part.03-Replace_Derived_Variable_with_Query](./part.03-Replace_Derived_Variable_with_Query)


**[⬆ back to top](#table-of-contents)**

