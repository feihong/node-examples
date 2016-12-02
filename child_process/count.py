import sys
import itertools
import time

try:
    for i in itertools.count(1):
        print(i)
        time.sleep(1)
        # If you don't call this, parent process won't see output
        sys.stdout.flush()
except KeyboardInterrupt:
    print('Child process: OK, time to quit')
