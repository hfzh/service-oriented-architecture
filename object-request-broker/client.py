import sys
from omniORB import CORBA
import Greet

orb = CORBA.ORB_init(sys.argv, CORBA.ORB_ID)

ior = sys.argv[1]

obj = orb.string_to_object(ior)

gr = obj._narrow(Greet.Greeter)

if gr is None:
  print "Can't narrow reference."
  sys.exit(1)

name = "World"
if sys.argv[2:]:
  name = sys.argv[2]

msg = gr.getGreeter(name)

print "%s" %msg 