def selection_sort(numbers):
    for i in range(0, len(numbers) - 1):
        min_index = i
        for j in range(i, len(numbers)):
            if numbers[j] < numbers[min_index]:
                min_index = j
        if min_index != i:
            numbers[i], numbers[min_index] = numbers[min_index], numbers[i] 
    return numbers
