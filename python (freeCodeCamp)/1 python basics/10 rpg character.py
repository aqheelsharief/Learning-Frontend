full_dot = '●'
empty_dot = '○'

def create_character(name, strength, intelligence, charisma):
    if not isinstance(name, str):
        return "The character name should be a string"

    if name == "":
        return "The character should have a name"

    if len(name) > 10:
        return "The character name is too long"

    if " " in name:
        return "The character name should not contain spaces"

    stats = [strength, intelligence, charisma]

    if not all(isinstance(stat, int) for stat in stats):
        return "All stats should be integers"

    if not all(stat >= 1 for stat in stats):
        return "All stats should be no less than 1"

    if not all(stat <= 4 for stat in stats):
        return "All stats should be no more than 4"

    if sum(stats) != 7:
        return "The character should start with 7 points"

    strength_dots = "●" * strength + "○" * (10 - strength)
    intelligence_dots = "●" * intelligence + "○" * (10 - intelligence)
    charisma_dots = "●" * charisma + "○" * (10 - charisma)

    return (
        f"{name}\n"
        f"STR {strength_dots}\n"
        f"INT {intelligence_dots}\n"
        f"CHA {charisma_dots}"
    )

