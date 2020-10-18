# Chapter 10 - Simplifying Conditional Logic
**조건부 로직 간소화**

조건부 로직은 프로그램의 힘을 강화하는데 기여하지만, 안타깝게도 프로그램을 복잡하게 만드는 원흉이기도 하다. 


## table of contents
1. [DECOMPOSE CONDITIONAL](#DECOMPOSE-CONDITIONAL)
1. [CONSOLIDATE CONDITIONAL EXPRESSION](#CONSOLIDATE-CONDITIONAL-EXPRESSION)

---


## DECOMPOSE CONDITIONAL


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


```js

```

```js

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

### 코드
- [part.02-Consolidate_Conditional_Expression](./part.02-Consolidate_Conditional_Expression)


**[⬆ back to top](#table-of-contents)**