def number_pattern(n):
    if not isinstance(n, int) or isinstance(n, bool):
        return 'Argument must be an integer value.'
    if n<1:
        return 'Argument must be an integer greater than 0.'
    strin = ''
    for i in range(1, n):
        strin += str(i) + ' '
    return strin + str(n)

print(number_pattern(4))