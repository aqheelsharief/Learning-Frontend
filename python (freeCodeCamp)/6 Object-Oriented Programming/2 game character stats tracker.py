class GameCharacter:
    def __init__(self, name):
        self._name = name
        self._health = 100
        self._mana = 50
        self._level = 1

    @property
    def name(self):
        return self._name

    @property
    def health(self):
        return self._health

    @health.setter
    def health(self, num):
        if num>=0 and num<=100:
            self._health = num
        if num<=0:
            self._health = 0
        if num>=100:
            self._health = 100

    @property
    def mana(self):
        return self._mana

    @mana.setter
    def mana(self, num):
        if num>=0 and num<=50:
            self._mana = num
        if num<=0:
            self._mana = 0
        if num>=100:
            self._mana = 50


    @property
    def level(self):
        return self._level

    def level_up(self):
        self._level += 1
        self.health = 100 
        self.mana = 50 
        print(f'{self.name} leveled up to {self.level}!')

    def __str__(self):
        return  f'''Name: {self.name}\nLevel: {self.level}\nHealth: {self.health}\nMana: {self.mana}'''
