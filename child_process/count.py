import sys
import itertools
import time

if len(sys.argv) >= 2:
    last = int(sys.argv[1])
else:
    last = None

try:
    for i in itertools.count(1):
        print(i)
        time.sleep(1)
        # If you don't call this, parent process won't see output
        sys.stdout.flush()
        if i == last:
            print('Finished counting')
            break
except KeyboardInterrupt:
    print('Child process: OK, time to quit')
