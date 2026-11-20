
class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def deposit(self, amount, description=""):
        self.ledger.append({
            "amount": amount,
            "description": description
        })

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({
                "amount": -amount,
                "description": description
            })
            return True
        return False

    def get_balance(self):
        return sum(item["amount"] for item in self.ledger)

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        return amount <= self.get_balance()

    def __str__(self):
        output = self.name.center(30, "*") + "\n"

        for item in self.ledger:
            description = item["description"][:23]
            amount = f"{item['amount']:.2f}"

            output += f"{description:<23}{amount:>7}\n"

        output += f"Total: {self.get_balance():.2f}"

        return output


def create_spend_chart(categories):
    output = "Percentage spent by category\n"

    total_spent = sum(
        -item["amount"]
        for category in categories
        for item in category.ledger
        if item["amount"] < 0
    )

    percentages = []

    for category in categories:
        spent = sum(
            -item["amount"]
            for item in category.ledger
            if item["amount"] < 0
        )

        if total_spent == 0:
            percentage = 0
        else:
            percentage = int((spent / total_spent) * 100)

        percentage = (percentage // 10) * 10
        percentages.append(percentage)

    for level in range(100, -1, -10):
        output += f"{level:>3}| "

        for percentage in percentages:
            if percentage >= level:
                output += "o  "
            else:
                output += "   "

        output += "\n"

    output += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    max_length = max(len(category.name) for category in categories)

    for i in range(max_length):
        output += "     "

        for category in categories:
            if i < len(category.name):
                output += category.name[i] + "  "
            else:
                output += "   "

        if i != max_length - 1:
            output += "\n"

    return output
