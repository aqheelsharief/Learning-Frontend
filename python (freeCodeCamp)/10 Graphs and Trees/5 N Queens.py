def dfs_n_queens(n):
    if n< 1:
        return []
    queens = []
    solutions = []
    def dfs(row):
        if n == row:
            solutions.append([*queens])
            return 
        for col in range(n):
            safe = True
            for p_row in range(row):
                p_col = queens[p_row]
                if p_col == col or abs(p_row - row) == abs(p_col - col):
                    safe = False
                    break
            if safe :
                queens.append(col)
                dfs(row+1)
                queens.pop()

    dfs(0)
    return solutions

