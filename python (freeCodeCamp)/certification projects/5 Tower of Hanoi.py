def hanoi_solver(n):
    rods = {'A': list(range(n, 0, -1)), 'B': [], 'C': []}
    states = []

    def snap():
        states.append(f"{rods['A']} {rods['B']} {rods['C']}")

    def move(k, src, dst, aux):
        if k == 0:
            return
        move(k - 1, src, aux, dst)
        rods[dst].append(rods[src].pop())
        snap()
        move(k - 1, aux, dst, src)

    snap() 
    move(n, 'A', 'C', 'B')
    return '\n'.join(states)