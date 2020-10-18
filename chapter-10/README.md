# Chapter 10 - Simplifying Conditional Logic
**조건부 로직 간소화**

조건부 로직은 프로그램의 힘을 강화하는데 기여하지만, 안타깝게도 프로그램을 복잡하게 만드는 원흉이기도 하다. 


## table of contents
1. [DECOMPOSE CONDITIONAL](#DECOMPOSE-CONDITIONAL)


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


**[⬆ back to top](#table-of-contents)**