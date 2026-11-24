
class HashTable:
    def __init__(self):
        self.collection = {}

    def hash(self, key):
        return sum(ord(char) for char in key)

    def add(self, key, value):
        key_hash = self.hash(key)

        if key_hash not in self.collection:
            self.collection[key_hash] = {}

        self.collection[key_hash][key] = value

    def remove(self, key):
        key_hash = self.hash(key)

        if key_hash in self.collection and key in self.collection[key_hash]:
            del self.collection[key_hash][key]

            if not self.collection[key_hash]:
                del self.collection[key_hash]

    def lookup(self, key):
        key_hash = self.hash(key)

        if key_hash in self.collection:
            return self.collection[key_hash].get(key)

        return None
