def quick_sort(numbers):
    if len(numbers) <= 1:
        return numbers
    pivot = numbers[0]
    small = []
    equal = []
    large = []
    for i in numbers:
        if i < pivot:
            small.append(i)
        elif i == pivot:
            equal.append(i)
        else:
            large.append(i)
    small = quick_sort(small)
    large = quick_sort(large)
    return [*small, *equal, *large]