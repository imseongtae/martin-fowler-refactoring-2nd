# chapter.7 캡슐화

모듈을 분리하는 가장 중요한 기준은 시스템에서 각 모듈이 자신을 제외한 다른 부분에 드러내지 않아야 할 비밀을 얼마나 잘 숨기느냐에 있다.

## 대표적인 데이터 구조
- 레코드 캡슐화하기
- 컬렉션 캡슐화하기



## table of contents
1. [7.1 Encapsulate Record](#encapsulate-record)
1. [7.2 Encapsulate Collection](#Encapsulate-Collection)
1. [7.3 Replace Primitive with Object](#Replace-Primitive-with-Object)
1. [7.4 Replace Temp with Query](#Replace-Temp-with-Query)
1. [7.5 Extract Class](#Extract-Class)
1. [7.6 Inline Class](#Inline-Class)
1. [7.7 Hide Delegate](#Hide-Delegate)
1. [7.8 Remove Middle Man](#Remove-Middle-Man)
1. [7.9 Substitute Algorithm](#Substitute-Algorithm)

---


## Encapsulate Record
7.1 레코드 캡슐화하기

```js
organization = {name: '애크미 구스베리', country: 'GB'};
```

```js
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get country() { return this._country; }
  set country(arg) { this._country = arg; }
}
```

### 배경(Motivation)
대부분의 프로그래밍 언어는 레코드를 표현하는 구조를 통해 연관된 여러 데이터를 직관적인 방식으로 묶을 수 있는 방식을 제공하는데, 이를 통해 각각을 따로 취급할 때보다 훨씬 의미 있는 단위로 전달할 수 있게 해준다.
**하지만 단순한 레코드에는 단점이 있다.** 특히, 계산해서 얻을 수 있는 값과 그렇지 않은 값을 명확히 구분해 저장해야 하는 점이 번거롭다. 

> 바로 이 때문에 나는 가변 데이터를 저장하는 용도로는 레코드보다 객체를 선호하는 편이다.


#### 레코드의 두 가지 구조로 구분할 수 있다
- 필드 이름을 노출하는 형태
- 필드를 외부로부터 숨겨서 내가 원하는 이름을 쓸 수 있는 형태
  - 주로 라이브러리에서 해시, 맵, 딕셔너리, 연관 배열 등의 이름으로 제공


### 절차
1. 레코드를 담은 변수를 캡슐화한다.
1. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정한다.
1. 테스트한다.
1. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
1. 레코드를 반환하는 예전 함수를 사용하는 코드를 (4)에서 만든 새 함수를 사용하도록 바꾼다. 필드에 접근할 때는 객체의 접근자를 사용한다. 적절한 접근자가 없다면 추가한다. 한 부분을 바꿀 때마다 테스트한다.
1. 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 함수들을 제거한다.
1. 테스트한다.
1. 레코드의 필드도 데이터 구조인 중첩 구조라면 레코드 캡슐화하기와 컬렉션 캡슐화하기를 재귀적으로 적용한다.


#### 학습이 필요한 단어
- 직렬화(serialize)
- 해시맵


**[⬆ back to top](#table-of-contents)**


## Encapsulate Collection
7.2 컬렉션 캡슐화하기

```js
class Person {
  get courses() {
    return this._courses;
  } 
  set courses(aList) {
    this._courses = aList;
  }
} 
```

```js
class Person {
  get courses() {
		return this._courses.slice();
	}
	addCourse(aCourse) { this._courses.push(aCourse); }
	removeCourse(aCourse) { ... }
} 
```


### 배경(Motivation)

가변 데이터를 캡슐화하면 데이터 구조가 언제 어떻게 수정되는지 파악하기 쉬워서 필요한 시점에 데이터 구조를 변경하기 쉬워진다. 
> 특히 객체지향 개발자들은 캡슐화를 적극 권장하는데 컬렉션을 다룰 때는 곧잘 실수를 저지르곤 한다.  

컬렉션 변수로의 접근을 캡슐화하면서 게터가 컬렉션 자체를 반환하도록 한다면, 그 컬렉션을 감싼 클래스가 눈치재지 못하는 상태에서 컬렉션의 원소들이 바뀌어버릴 수 있다.
나는 이런 문제를 방지하기 위 컬렉션을 감싼 클래스에 흔히 `add()`와 `remove()`라는 이름의 컬렉션 변경자 메서드를 만든다.


#### 내부 컬렉션을 수정하지 못하게 막는 방법
> 모든 팀원이 원본 모듈 밖에서는 컬렉션을 수정하지 않는 습관을 가지고 있다면 이런 메서드를 제공하는 것만으로 충분할 수 있다. 하지만 실수 한 번이 굉장히 찾기 어려운 버그로 이어질 수 있으니 습관에 의존하는 방식은 바람직하지 않다.  
1. 절대로 컬렉션 값을 반환하지 않는 것
1. 컬렉션을 읽기 전용으로 제공하는 것
1. 컬렉션 게터를 제공하되, 내부 컬렉션의 복제본을 반환하는 것(가장 흔히 많이 사용하는 방식)

> 여기서 중요한 점은 일관성을 주는 것!! 한 가지 방식만 적용해서 컬렉션 접근 함수의 동작 방식을 통일해야 함

### 절차
1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 한다.
1. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
1. 정적 검사를 수행한다.
1. 컬렉션을 참조하는 부분을 모두 찾는다. 컬렉션의 변경자를 호출하는 코드가 모두 앞에서 추가한 추가/제거 함수를 호출하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
1. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기 전용 프락시나 복제본을 반환하게 한다.
1. 테스트한다.



### 예시
[part.02-Encapsulate_Collection](./part.02-Encapsulate_Collection)


#### JavaScript
- `slice`: 기존의 배열을 건드리지 않고 새로운 배열을 반환


### 맺음
> 마틴 파울러: 내 경험에 따르면 컬렉션에 대해 어느 정도 강박증을 가지고 불필요한 복제본을 만드는 편이, 예상치 못한 수정이 촉발한 오류를 디버깅하는 것보다 낫다. 

가령 다른 언어들은 컬렉션을 수정하는 연산들이 기본적으로 복제본을 만들어 처리하지만 자바스크립트에서는 배열을 정렬할 때 원본을 수정한다. 컬렉션 관리를 책임지는 클래스라면 항상 복제본을 제공해야 한다.

**[⬆ back to top](#table-of-contents)**


## Replace Primitive with Object
**7.3 기본형을 객체로 바꾸기**

```js
orders.filter(o => 'high' === o.priority || 'rush' === o.priority);
```

```js
orders.filter(o => o.priority.higherThan(new Priority('normal')));
```


### 배경(Motivation)
개발 초기에는 단순한 정보를 수자나 문자열 같은 간단한 데이터 항목으로 표현할 때가 많지만 개발이 진행되면서 이 정보들이 더 이상 간단하지 않게 변한다.

> 마틴 파울러: 나는 단순한 출력 이상의 기능이 필요해지는 순간 그 데이터를 표현하는 전용 클래스를 정의하는 편이다. 시작은 효과가 미미하지만 프로그램이 커질수록 점점 유용한 도구가 된다. 그리 대단해 보이지 않을지 모르지만 코드베이스에 미치는 효과는 놀라울 만큼 크다.
> 초보 프로그래머에게는 직관에 어긋나 보일 수 있지만 경험 많은 개발자들은 여러 가지 리팩터링 중에서도 가장 유용한 것으로 손꼽는다.

### 절차
1. 아직 변수를 캡슐화하지 않았다면 캡슐화한다.
1. 단순한 값 클래스를 만든다. 생성자는 기존 값을 인수로 받아서 저장하고, 이 값을 반환하는 게터를 추가한다.
1. 정적 검사를 수행한다.
1. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터를 수정한다. 이미 있다면 필드의 타입을 적절히 변경한다. 
1. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다. 
1. 테스트한다.
1. 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다. 


### 예시
[part.03-Replace_Primitive_with_Object](./part.03-Replace_Primitive_with_Object)


**[⬆ back to top](#table-of-contents)**


## Replace Temp with Query
7.4 임시변수를 질의 함수로 바꾸기


### 배경(Motivation)
함수 안에서 어떤 코드의 결괏값을 뒤에서 다시 참조할 목적으로 임시 변수를 쓰기도 한다. 임시 변수를 사용하면 값을 계산하는 코드가 반복되는 걸 줄이고 값의 의미를 설명할 수도 있어서 유용한다.  
긴 함수의 한 부분을 별도 함수로 추출하고자 할 때 먼저 변수들을 각각의 함수로 만들면 일이 수월해진다. 추출한 함수에 변수를 따로 전달할 필요가 없어지기 때문이다. 또한 이 덕분에 추출한 함수와 원래 함수의 경계가 더 분명해지기도 하는데, 그러면 부자연스러운 의존 관계나 부수효과를 찾고 제거하는데 도움이 된다.

### 절차
1. 변수가 사용되기 전에 값이 확실히 결정되는지, 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지는 않는지 확인한다.
1. 읽기 전용으로 만들 수 잇는 변수는 읽기 전용으로 만든다.
1. 테스트한다.
1. 변수 대입문을 함수로 추출한다.
1. 테스트한다.
1. 변수 인라인하기로 임시 변수를 제거한다.


### 예시
[part.04-Replace_Temp_with_Query](./part.04-Replace_Temp_with_Query)



**[⬆ back to top](#table-of-contents)**


## Extract Class
7.5 클래스 추출하기

```js


```

```js


```

### 배경(Motivation)
클래스는 반드시 명확하게 추상화하고, 소수의 주어진 역할만 처리해야 한다는 가이드 라인을 들어봤을 것이다. 하지만 실무에서는 몇 가지 연산을 추가하고 데이터도 보강하다보면 클래스가 점점 비대해지곤한다.   
메서드와 데이터가 너무 많은 클래스는 이해하기가 쉽지 않으니 잘 살펴보고 적절히 분리하는 것이 좋다. **특히 일부 데이터와 메서드를 따로 묶을 수 있다면** 어서 분리하라는 신호다.
함께 변경되는 일이 많거나 서로 의존하는 데이터들도 분리한다. 특정 데이터나 메서드 일부를 제거하면 어떤 일이 일어나는지 자문해보면 판단에 도움이 된다. 제거해도 다른 필드나 메서드들이 논리적으로 문제가 없다면 분리할 수 있다는 뜻이다.


### 절차
1. 클래스의 역할을 분리할 방법을 정한다.
1. 분리될 역할을 담당할 클래스를 새로 만든다.
1. 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장해둔다.
1. 분리될 역할에 필요한 필드들을 새 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
1. 메서드들도 새 클래스로 옮긴다. 이때 저수준 메서드, 즉 다른 메서드를 호출하기보다는 호출을 당하는 일이 많은 메서드부터 옮긴다. 하나씩 옮길 때마다 테스트한다.
1. 양쪽 클래스의 인터페이스를 살펴보면서 불필요한 메서드를 제거하고, 이름도 환경에 맞게 바꾼다.
1. 새 클래스를 외부로 노출할지 정한다. 노출하려거든 새 클래스에 참조를 값으로 바꾸기를 적용할지 고민해본다.



### 코드
[part.05-Extract_Class](./part.05-Extract_Class)


**[⬆ back to top](#table-of-contents)**


## Inline Class
7.6 클래스 인라인하기

```js
class Person {
  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  get officeNumber() { return this._telephoneNumber.number; }
}
class TelephoneNumber {
  get areaCode() { return this._areaCode; }
	get number() { return this._number; }
}
```

```js
class Person {
  get officeAreaCode() { return this._officeAreaCode; }
  get officeNumber() { return this._officeNumber; }
}
```

### 배경(Motivation)
클래스 인라인하기는 클래스 추출하기를 거꾸로 돌리는 리팩터링이다. 더 이상 제 역할을 못 해서 그대로 두면 안 되는 클래스는 인라인해버린다. 역할을 옮기는 리팩터링을 하고 난 후 특정 클래스에 남은 역할이 거의 없을 때 이런 현상이 발생하는데, 역할이 거의 없는 불쌍한 클래스를 가장 많이 사용하는 클래스로 옮기자. 

#### 왜하는가?
더 이상 제역할을 못하는 클래스를 인라인하여 
- 두 클래스의 기능을 하나로 합친 다음 새로운 클래스를 추출하는게 쉬울 수도 있음
- 코드를 재구성할 때 흔히 사용하는 방식
- 상황에 따라 하나씩 옮기는 게 나을 수도 있고, 하나로 합친다음 추출하기 리팩터링으로 분리하는게 쉬울 수 있음



### 절차
1. 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다. 이 메서드들은 단순히 작업을 소스 클래스로 위임해야 한다.
1. 소스 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 바꾼다. 하나씩 바꿀 때마다 테스트한다. 
1. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다. 
1. 소스 클래스를 삭제하고 조의를 표한다.

### 코드
- [Githistory for Test Code](https://github.githistory.xyz/imseongtae/martin-fowler-reafactoring-2nd/blob/master/chapter-07/part.06-Inline_Class/after.js)
- [part.06-Inline_Class](./part.06-Inline_Class)


**[⬆ back to top](#table-of-contents)**



## Hide Delegate
7.7 위임 숨기기

```js
manager = aPerseon.department.manager;
```

```js
manager = aPerson.manager;

class Person {
  get manager() { return this.department.manager; }
}
```


### 배경(Motivation)
**모듈화 설계를 제대로 하는 핵심은 캡슐화다.** 캡슐화는 모듈들이 시스템의 다른 부분에 대해 알아야 할 내용을 줄여준다. 캡슐화가 잘 되어 있다면 무언가를 변경해야 할 때 함께 고려해야 모듈 수가 적어져서 코드를 변경하기가 훨씬 쉬워진다.

> 객체지향을 처음 배울 때는 캡슐화란 필드를 숨기는 것이라고 배운다. 그러다 경험이 쌓이면 캡슐화의 역할이 그보다 많다는 사실을 깨닫는다.

#### 왜하는가?
의존성을 없애기 위해 수행하며, 의존성을 없애면 위임 객체가 수정되더라도 서버 코드만 고치면 되므로 클라이언트는 아무런 영향을 받지 않는다.


### 절차
1. 위임 객체의 각 메서드에 해당하는 위임 메서드를 서버에 생성한다.
1. 클라이언트가 위임 객체 대신 서버를 호출하도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
1. 모두 수정했다면, 서버로부터 위임 객체를 얻는 접근자를 제거한다.
1. 테스트한다.


### 코드
- [part.07 Hide Delegate Githistory](https://github.githistory.xyz/imseongtae/martin-fowler-reafactoring-2nd/blob/master/chapter-07/part.07-Hide_Delegate/after.js)
- [part.07-Hide_Delegate](./part.07-Hide_Delegate)


**[⬆ back to top](#table-of-contents)**


## Remove Middle Man
7.8 중개자 제거하기

```js
manager = aPerson.manager

class Person {
  get manager() { return this.department.manager }
}

```

```js
manager = aPerson.department.manager
```


### 배경(Motivation)
위임 숨기기의 배경 절에서 위임 객체를 캡슐화하는 이점을 설명했는데, 그 이점이 거저 주어지는 건 아니다. 클라이언트가 위임 객체의 또 다른 기능을 사용하고 싶을 때마다 서버에 위임 메서드를 추가해야 하는데, 이렇게 기능을 추가하다 보면 단순히 전달만 하는 위임 메서드들이 점점 성가셔진다. 그러면 서버클래스는 그저 중개자 역할로 전락하여, 차라리 클라이언트가 위임 객체를 직접 호출하는 게 나을 수 있다.

> 위임 숨기기와 중개자 제거하기 리팩토링을 통해 언제든 균형점을 옮길 수 있다.

#### 왜하는가?
6개월 전에는 바람직했던 캡슐화가 이제는 어색할 경우..!


### 절차
1. 위임 객체를 얻는 게터를 만든다.
1. 위임 메서드를 호출하는 클라이언트가 모두 이 게터를 거치도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
1. 모두 수정했다면 위임 메서드를 삭제한다.


### 코드
- [Remove Middle Man Githistory](https://github.githistory.xyz/imseongtae/martin-fowler-reafactoring-2nd/blob/master/chapter-07/part.08-Remove_Middle_Man/after.js)
- [part.08-Remove_Middle_Man](./part.08-Remove_Middle_Man)


**[⬆ back to top](#table-of-contents)**


## Substitute Algorithm
7.9 알고리즘 교체하기

### 배경(Motivation)
> 어떤 목적을 달성하는 방법은 여러 가지가 있게 마련이다. 그중에 다른 것보다 더 쉬운 방법이 분명히 존재한다. 알고리즘도 마찬가지다. 나는 더 간명한 방법을 찾아내면 코드를 더 간명한 방식으로 고친다.


#### 왜하는가?
문제를 더 확실히 이해하고 훨씬 쉽게 해결하기 위해

> 문제를 더 확실히 이해하고 훨씬 쉽게 해결하는 방법을 발견했을 때..! 훨씬 쉽게 해결하는 방향으로 바꾼다. 어떤 목적을 달성하는 방법 중에 더 쉬운 방법으로 수행해야 복잡도를 낮출 수 있다.


### 절차
1. 교체할 코드를 함수 하나에 모은다.
1. 이 함수만을 이용해 동작을 검증하는 테스트를 마련한다.
1. 대체할 알고리즘을 준비한다.
1. 정적 검사를 수행한다.
1. 기존 알고리즘과 새 알고리즘의 결과를 비교하는 테스트를 수행한다. 두 결과가 같다면 리팩터링이 끝난다. 그렇지 않다면 기존의 알고리즘을 참고해서 새 알고리즘을 테스트하고 디버깅한다.


### 코드
- [Substitute_Algorithm Githistory](https://github.githistory.xyz/imseongtae/martin-fowler-reafactoring-2nd/blob/master/chapter-07/part.09-Substitute_Algorithm/after.js)
- [part.09-Substitute_Algorithm](./part.09-Substitute_Algorithm)



**[⬆ back to top](#table-of-contents)**


