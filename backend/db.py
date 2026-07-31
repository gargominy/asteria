import sqlite3

class DB:
    def __init__(self, path):
        self.connection = sqlite3.connect(path, check_same_thread=False)
        self.connection.row_factory = sqlite3.Row

    def execute(self, query, *args):
        cursor = self.connection.cursor()

        try :
            cursor.execute(query, args)
        except sqlite3.Error as e:
            raise RuntimeError(f"SQL Error : {e}") from e

        command = query.strip().split()[0].upper()

        if command == "SELECT":
            rows = cursor.fetchall()
            return [dict(row) for row in rows]

        elif command == "INSERT":
            self.connection.commit()
            return cursor.lastrowid

        elif command in ("UPDATE", "DELETE"):
            self.connection.commit()
            return cursor.rowcount

        else :
            self.connection.commit()
            return None

    def close(self):
        self.connection.close()
