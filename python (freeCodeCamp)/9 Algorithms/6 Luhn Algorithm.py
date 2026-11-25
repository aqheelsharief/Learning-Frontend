
def verify_card_number(number):
    number = number.replace(' ', '').replace('-', '')

    res = 0
    d = False

    for i in number[::-1]:
        digit = int(i)

        if d:
            digit *= 2

            if digit > 9:
                digit -= 9

        res += digit
        d = not d

    if res % 10 == 0:
        return 'VALID!'
    else:
        return 'INVALID!'
