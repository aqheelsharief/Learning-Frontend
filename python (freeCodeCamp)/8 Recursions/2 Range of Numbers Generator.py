def range_of_numbers(start_num, end_num):
    if start_num == end_num:
        return [start_num]
    num_list = range_of_numbers(start_num, end_num-1)
    num_list.append(end_num)
    return num_list