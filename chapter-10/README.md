# Chapter 10 - Simplifying Conditional Logic
**조건부 로직 간소화**

조건부 로직은 프로그램의 힘을 강화하는데 기여하지만, 안타깝게도 프로그램을 복잡하게 만드는 원흉이기도 하다. 


## table of contents
1. [DECOMPOSE CONDITIONAL](#DECOMPOSE-CONDITIONAL)
1. [CONSOLIDATE CONDITIONAL EXPRESSION](#CONSOLIDATE-CONDITIONAL-EXPRESSION)
1. [REPLACE NESTED CONDITIONAL WITH GUARD CLAUSES](#REPLACE-NESTED-CONDITIONAL-WITH-GUARD-CLAUSES)
1. [REPLACE CONDITIONAL WITH POLYMORPHISM](#REPLACE-CONDITIONAL-WITH-POLYMORPHISM)


---


## DECOMPOSE CONDITIONAL
10.1 조건문 분해하기

```js
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.reqularRate + plan.reqularServiceCharge;
}
```

```js
if (summer()) {
  charge = summerCharge();
} else {
  charge = regularCharge();
}
```

### 배경(Motivation)
복잡한 조건부 로직은 프로그램을 복잡하게 만다는 가장 흔한 원흉에 속한다. 다양한 조건에 따라 동작도 다양한 코드를 작성하면 순식간에 꽤 긴 조건문이 탄생한다. 
조건을 검사하고, 그 결과에 따른 동작을 표현한 코드는 무슨 일이 일어나는지 이야기해주지만 '왜' 일어나는지는 말해주지 않는다. 

#### 왜하는가?
거대한 코드 블럭이 주어지면 코드를 분위별로 분해한 다음 해체된 코드 덩어리들을 각 덩어리의 의도를 살린 이름의 함수 호출로 바꾸자. 그러면 전체적인 의도가 더 확실히 드러난다.


### 절차
1. 조건식과 그 조건식에 딸린 조건절 각각을 함수로 추출한다.


### 코드
- [part.01-Decompose_Conditional](./part.01-Decompose_Conditional)

**[⬆ back to top](#table-of-contents)**


## CONSOLIDATE CONDITIONAL EXPRESSION
10.2 조건식 통합하기

```js
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;
```

```js
if (isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
  return (
    anEmployee.seniority < 2 
    || anEmployee.monthsDisabled > 12 
    || anEmployee.isPartTime
  );
}
```

### 배경(Motivation)
비교하는 조건은 다르지만 그 결과로 수행하는 동작은 똑같은 코드들이 더러 있는데, 어차피 같은 일을 할 거라면 조건 검사도 하나로 통하하는 게 낫다. 이럴 때 'and'연산자와 'or'연산자를 사용하면 여러 개의 비교 로직을 하나로 합칠 수 있다. 

조건부 코드 통합을 통해 첫째, 여러 조각으로 나뉜 조건들을 하나로 통합함으로써 내가 하려는 일이 더 명확해진다. 나눠서 순서대로 비교해도 결과는 같지만, 읽는 사람은 독립된 검사들이 우연히 함께 나열된 것으로 오해할 수 있다. 
두 번째 이유는 이 작업이 함수 추출하기 까지 이어질 가능성이 높기 때문이다. 복잡한 조건식을 함수로 추출하면 코드의 의도가 훨씬 분명하게 드러나는 경우가 많다. 함수 추출하기는 '무엇'을 하는지를 기술하던 코드를 '왜'하는지를 말해주는 코드로 바꿔주는 효과적인 도구임을 기억하자

#### 왜하는가?
1. 여러 조각으로 나뉜 조건들을 통합함으로써 하려는 일이 더 명확해짐
1. 이 작업이 함수 추출하기로 이어질 가능성이 높다. 함수 추출하기를 통해 '무엇'을 하는지를 기술하던 코드를 '왜'하는지를 말해주는 코드로 바꿀 수 있다.


### 절차
1. 해당 조건식들 모두에 부수효과가 없는지 확인한다.
1. 조건문 두 개를 선택하여 두 조건문의 조건식들을 논리 연산자로 결합한다.
1. 테스트한다.
1. 조건이 하나만 남을 때까지 2, 3 과정을 반복한다.
1. 하나로 합쳐진 조건식을 함수로 추출할지 고려해본다.

### 예시
1. 조건 검사가 순차적이라면 `or` 사용
1. 조건 검사가 if문이 중첩된다면 `and` 사용

- if문이 중첩되는 경우

```js
if (anEmployee.onVacation)
  if (anEmployee.seniority > 10)
    return 1;
return 0.5;
```

- 위의 조건들을 and 연산자로 결합한 예

```js
if ((anEmployee.onVacation)
    && (anEmployee.seniority > 10)) return 1;
return 0.5;
```

### 코드
- [part.02-Consolidate_Conditional_Expression](./part.02-Consolidate_Conditional_Expression)


**[⬆ back to top](#table-of-contents)**



## REPLACE NESTED CONDITIONAL WITH GUARD CLAUSES
10.3 중첩 조건문을 보호 구문으로 바꾸기

```js
function getPayAmount() {
  let result;
  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeparated) 
      result = separatedAmount();
    else {
      if (isRetired) 
        result = retiredAmount();
      else 
        result = normalPayAmount();
    }
  }
  return result;
}
```

```js
function getPayAmount() {
  let result;
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayAmount();
}
```

### 배경(Motivation)
조건문은 두 가지 형태가 주로 사용된다.  
1. '참인 경로'와 '거짓인 경로' 모두 정상 동작으로 이어지는 형태 
1. 경로 중 한쪽만 정상인 형태

- 위의 두 형태는 의도가 다르므로, 의도가 코드에 드러나야 함
- 두 경로 모두 정상 동작한다면 `if else` 절을 사용하는 형태
- 한쪽만 정상이라면 비정상 조건을 `if`에서 검사한 다음, 참이면 함수에서 빠져나오는 형태를 사용, 이 검사를 **보호 구문**이라고 함


#### 왜하는가?
중첩 조건문을 보호 구문으로 바꾸기 리팩터링의 핵심은 의도를 부각하는데 있다.
보호 구문은 '이건 이 함수의 핵심이 아니다. 이 일이 일어나면 무언가 조치를 취한 후 함수에서 빠져나온다'라고 이야기한다.


### 절차
1. 교체해야 할 조건 중 가장 바깥 것을 선택하여 보호 구문으로 바꾼다.
1. 테스트한다.
1. 1, 2 과정을 필요한 만큼 반복한다.
1. 모든 보호 구문이 같은 결과를 반환한다면 보호 구문들의 조건식을 통합한다.

### 코드
[part.03-Replace_Nested_Conditional_With_Guard_Clauses](./part.03-Replace_Nested_Conditional_With_Guard_Clauses)


**[⬆ back to top](#table-of-contents)**


## REPLACE CONDITIONAL WITH POLYMORPHISM
10.4 조건부 로직을 다형성으로 바꾸기

```js
switch (bird.type) {
  case '유럽 제비':
    return '보통이다';
  case '아프리카 제비':
    return (bird.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
  case '노르웨이 파랑 앵무':
    return (bird.voltage > 100) ? '그을렸다' : '예쁘다';
  default:
      return '알 수 없다';
}
```

```js
class EuropeanSwallow {
  get plumage() {
    return '보통이다'
  }
}
class AfricanSwallow {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
  }
}
class NorwegianBlueParrot {
  get plumage() {
    return (this.voltage > 100) ? '그을렸다' : '예쁘다';
  }
}
```

### 배경(Motivation)
복잡한 조건부 로직은 프로그래밍에서 해석하기가 난해한 대상에 속하므로 조건문 구조를 그대로 둔 채 해결할 수도 있지만, 클래스와 다형성을 이용하면 더 확실하게 분리할 수도 있다.


#### 왜하는가?
복잡한 조건부 로직을 직관적으로 구조화하기 위해


### 절차
1. 다형적 동작을 표현하는 클래스들이 아직 없다면 만들어준다. 이왕이면 적합한 인스턴스를 알아서 만들어 반환하는 팩터리 함수도 함께 만든다. 
1. 호출하는 코드에서 팩터리 함수를 사용하게 한다.
1. 조건부 로직 함수를 슈퍼클래스로 옮긴다.
1. 서브클래스 중 하나를 선택한다. 서브클래스에서 슈퍼클래스의 조건부 로직 메서드를 오버라이드한다. 조건부 문장 중 선택된 서브클래스에 해당하는 조건절을 서브클래스 메서드로 복사한 다음 적절히 수정한다.
1. 같은 방식으로 각 조건절을 해당 서브클래스에서 메서드로 구현한다.
1. 슈퍼클래스 메서드에는 기본 동작 부분만 남긴다. 혹은 슈퍼클래스가 추상 클래스여야 한다면, 이 메서드를 추상으로 선언하거나 서브클래스에서 처리해야 함을 알리는 에러를 던진다.




### 코드
[part.04-Replace_Conditional_With_Polymorphism](./part.04-Replace_Conditional_With_Polymorphism)


**[⬆ back to top](#table-of-contents)**