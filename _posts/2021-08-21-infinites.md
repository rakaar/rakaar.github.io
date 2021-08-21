---
layout: post
title: Not all Infinities are same
subtitle: The genius of George Cantor
date: 2021-08-21
categories: [math]
---

Few months back, while reading Emperor's new mind by Roger Penrose, I learnt a counter-intuitive mathematical fact, which I felt was interesting to share. We all are familiar with different types of numbers. The most common ones we use are 

- Natural Numbers: Used for counting in daily life. Lets denote by **N**

  0, 1, 2, 3, 4... 

- Integers: Natural numbers along with their negative counterpart. Let's denote this set using **Z**

  ...-3, -2, -1, 0, 1, 2, 3...

- Fractions: Numbers in the form of p/q, where p, q are integers and q is not zero. To be precise, they are called Rational numbers. Lets denote this using the set **Q**

  ....-5....-2/3....-1/4...0.....1/5....7/8....2/1....

  We know that each set of Numbers is an infinite set. That is, there are infinite number of natural numbers, infinite number of integers and also infinite number of fractions. Now, is it possible to compare their size? Can you say, which infinite set is a larger one? By intuition, one might rush to conclude that number of Integers is larger than number of natural numbers because integers contain natural numbers along with negative counter part. Also, intuition tells us that number of Fractions is larger than number of integers because they contain integers as well as all the numbers in between them.

  But here is a surprising truth- they all are of same size! Number of Natural numbers is same as number of Integers, which is same as number of rational numbers. The key thing to note that these all are infinite sets, and you can't rely on the intuition, which was used to compare sets of finite elements.

  When you want to compare finite sets it is easy to tell whether they are of same size are not. Just count elements in both the sets, check if they are equal or not. But in case of infinite sets, you can't count the size. Hence to compare 2 infinite sets, we use clever technique- finding one to one correspondence between the 2 infinite sets. 

  Here is a useful analogy. You have two baskets. One contains apples and the other contains oranges. If the number of apples and number of oranges are same, then for each unique apple, there is a corresponding unique orange. Suppose for a unique apple, there is no corresponding orange, then it means number of apples are larger than number of oranges. We do the same with numbers! It is using this idea, that we prove some counter-intuitive facts below.

## Size of Integers same as Size of Natural Numbers

As discussed above, to prove that number of integers is same as number of natural numbers, we find a one to one correspondence between integers and natural numbers. That is for each unique integer, there is a unique natural number. Now, below is the generalisation of the correspondence.

![Generalisation of Correspondence](https://imgur.com/A7dPixk.png)

Integers(**Z**) consist of zero, positive natural numbers, negative natural numbers  Natural numbers(**N**) consist of zero, even numbers, and odd numbers. So in the above above correspondence, we have shown that zero in **Z** corresponds to zero in **N**. Every negative number in **Z** has a corresponding unique odd number in **N**. Similarly, every positive number in **Z** has a corresponding unique number in **N**. You can see the same correspondence enumerated below.

![Enumerated below Z and N correspondence](https://i.imgur.com/taOO9aK.png)

As we can see above, for every integer, there is a corresponding unique Natural Number. For every apple, there is a corresponding unique orange! Hence both the sets are of same size.

## Size of Natural numbers is same as Size of Fractions

Now, this is not straight forward, but also not hard. It is a smart proof, as you will see. Write all the fractions with denominator as 1 in a row like below. Obviously you can't write all of them as there are infinite of them.

![1/1 -1/2 2/1 -2/1 ...](https://imgur.com/elb2x4S.png)

 And then in the next row write all the fractions with denominator 2. Then fill the next row with denominator 3. And so on...

![Grid](https://imgur.com/l7ZVbAh.png)
*Grid containing all the fractions*

Now below we have a grid containing all the fractions except zero. But note that there are repetitions. For example all the   one(1) appears in every row - 1/1, 2/2, 3/3 .... You can find half(1/2) in alternate rows rows - 1/2, 2/4.. Similarly there are many other fractions repeated, which are marked in Red.

![Marked in Red](https://imgur.com/8ymjxkW.png)

*Repeated Fractions marked in Red*

Now our goal is to prove that number of Natural numbers and number of fractions are same. Liked we did it previously, all we need to do is find a one-to-one correspondence between fractions and natural numbers. 

First the simplest part, Zero in Fractions corresponds to Zero in Natural numbers. Now we are left with finding a correspondence between the remaining fractions in the grid and Natural Numbers from one. The way we do this is by finding a path in the grid to cover all the fractions in the grid. And each point in the grid(a fraction here) covered will have a corresponding natural number as its index. To simplify, you start counting each point you visit. Since your path will cover all the fractions and each fraction has a corresponding Natural Number as its index. the one to one correspondence between fractions and Natural numbers is established. 

Now how do we find such a path? Say, we start with first number in the first row(1/1) and start moving in horizontal direction towards right. Will this path cover all the points in the grid? No, because the first row contains infinite fractions, you will never reach the next row and you will miss out all the subsequent rows. You can't cover all the points by moving in horizontal direction.

![](https://imgur.com/vVKsAJ2.png)

*Sad Missing Rows*

Similarly, suppose starting from 1/1 we move vertically towards bottom. In this way, we will never reach the next column as the first column is infinitely long. You can't cover all the points by moving in vertical direction.

![](https://imgur.com/8I9LYh0.png)                     

*Sad missing columns*

Neither strictly horizontal nor strictly vertical path directions cover all the points in the grid. So, instead we move in both directions - that is we move diagonally!. As shown in the below image, we start from 1/1 and move diagonally. 

![](https://imgur.com/HOu6L0x.png)

*Diagonal is the only way!*

As you can see we are not stuck in any of single row or a single column like in previous cases. And this way, you will have covered every fraction in the grid. For every fraction we visit, we assign it a corresponding Natural Number. That is 1/1 has a index 1, the next fraction -1/1 has index 2, the next fraction 1/2 has index 3. So, each fraction has a corresponding Natural Number as its index. And hence, we have seen that every fraction has a corresponding unique Natural Number. Note that while traversing we have avoided the repeated fractions.

![](https://imgur.com/eTwZdxX.png)

*Mapping between Fractions and Real Numbers*

Previously, we saw that the number of Natural Numbers is same as number of Integers. Now we saw that the number of Natural numbers is same as number of Fractions. So, here we have proved a counter intuitive fact. Natural numbers, number of integers, number of fractions all are infinite but are of same size. And using a similar argument, you can establish that number of even numbers is same as number of Natural numbers.

![](https://imgur.com/qxZmssK.png)

*Number of Natural Numbers is same as Number of Even Numbers*

This might tempt you to think that all infinite sets of numbers are of same size, and all we need is to find a one to one correspondence between the sets. But, here is another shocking truth. There are infinities of different types(that is why I chose such title of this blog). 

Real numbers are set of numbers containing both fractions(rational numbers) and irrational numbers like square root of 2, pi(3.1415...), e(2.718...). You will soon find out that this Real numbers set is larger in size than the Natural numbers set. How will we prove that? Going back to the analogy, if for an unique apple, there is no corresponding orange, then it means the number of apples are larger. In the same manner, suppose we make a list containing correspondence between all Natural Numbers and Real Numbers. If we manage to show that there exists a Real Number, which is not in the list, then it proves that Set of Real Numbers is larger than Set of Natural Numbers.  

Let us consider all the Real numbers between 0 and 1. Suppose we enumerate the list of real numbers between 0 and 1. And each real number is given indexed with a corresponding natural number.  Now, can I tell with confidence that the list also contains all the Real Numbers between 0 and 1? Intuitively, seems yes. But, the answer is no. It was Cantor's genius "diagonal" argument that he showed that one can find a unique real number, which is not in the list. 

![](https://imgur.com/ygH0MF1.png)

*The list containing all the Real Numbers between 0 and 1 and corresponding Natural Numbers as Index*

Let us list all the digits in the diagonal entries, which are marked in bold

```
1 8 5 1 2...
```

Now subtract 9 from each digit. Note that each digit obtained after subtracting from 9, will never be the same. The numbers formed will be 

```
8 1 4 8 7...
```

The real number between 0 and 1, that can be formed using the above digits will be 0.81487... By design, the new Real number 0.81487... can't occur anywhere in the list. This is because the new real number differs from the 1st real number at first digit, 2nd real number at 2nd digit, it differs from the 5th real number at 5th digit, it differs from nth real number at nth digit. So no matter what list of real numbers you give, using the diagonal argument we can always get a new real number that is not in the list. And that real number will not have a corresponding Natural Number. 

If all the Real numbers between 0 and 1 is larger than set of all Natural Numbers, then it is obvious that the complete set of Real Numbers is larger than set of Natural Numbers. Hence it is now apparent that there are 2 types of infinities - The size of Natural Numbers, people called it *Aleph-null* and the other one is size of Real Numbers, which is called *C*. Is the *C* the next immediate number after *Aleph-null*? This is asserted by Continuum hypothesis, which has not yet been solved.

The spirit of this ingenious "diagonal slash" argument given by George Cantor is also visible in later ground breaking works - Godel's Incomplete theorem and Turing's Halting Problem. Though such beautiful abstract ideas, may not appear to add any economic value to our daily life, they greatly excite a curious mind and are worth knowing!

## Appendix

- Strictly from a mathematician's perspective, numbers starting from zero are called Whole Numbers and numbers starting from one called Natural Numbers. But in Computer Science, numbers starting from zero are regarded as Natural Numbers. The book Emperor's New Mind follows the same convention.
- I have used the word Fractions instead of Rational Numbers as I felt "fractions" was a more common word.
