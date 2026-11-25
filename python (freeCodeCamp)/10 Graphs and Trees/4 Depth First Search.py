
def dfs(graph, start):
    stack = [start]
    visited = []

    while stack:
        node = stack.pop()

        if node not in visited:
            visited.append(node)

            for neighbor in range(len(graph)):
                if graph[node][neighbor] == 1 and neighbor not in visited:
                    stack.append(neighbor)

    return visited
