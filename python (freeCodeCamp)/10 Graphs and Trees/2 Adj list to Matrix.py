def adjacency_list_to_matrix(dic):
    matrix = []
    for v in dic.values():
        row = [0]*len(dic)
        for i in v:
            row[i] = 1
        matrix.append(row)
    for i in matrix:
        print(i)
    return matrix
