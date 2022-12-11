import sys
from omniORB import CORBA, PortableServer
import Greet, Greet__POA

class Greeter (Greet__POA.Greeter):
  def getGreeter(self, mesg):
    print "Client name is: \"%s\"." %mesg
    return "Hello, %s!" %mesg

orb = CORBA.ORB_init(sys.argv, CORBA.ORB_ID)
poa = orb.resolve_initial_references("RootPOA")

gr = Greeter()
grObj = gr._this()

print orb.object_to_string(grObj)

poaManager = poa._get_the_POAManager()
poaManager.activate()

orb.run()