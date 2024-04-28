import { useIntl, FormattedMessage } from 'react-intl'
import dynamic from 'next/dynamic'
import { LinkButton } from './ProjectGrid'
const CodeEditor = dynamic(
  () => import('@/components/CodeEditor/CodeEditor3'),
  {
    ssr: false,
  }
)

export function WhyOpenSource() {
  const intl = useIntl()

  return (
    // <div className="prose mx-auto  max-w-7xl divide-y-2 divide-gray-200 py-10 px-4 dark:prose-invert sm:py-16 sm:px-6 lg:px-8">
    //   <h2 className="text-3xl font-extrabold text-zinc-800 dark:text-zinc-100 ">
    //     <FormattedMessage id={'why?'} />
    //   </h2>
    <div className="prose dark:prose-invert text-lg text-zinc-800 dark:text-zinc-100">
      <ol >
        <li>
          <FormattedMessage id={'ans2'} />
          {/* ans2 before ans1 due to refactor */}
        </li>
        <li>
          <FormattedMessage id={'ans1'} />
        </li>
        <li>
          <FormattedMessage id={'ans3'} />
        </li>
      </ol>
      <FormattedMessage id={'recurse_python'} />
      <div style={{minHeight: 510}}>
        <CodeEditor 
        id="fde2be7e-519e-4db1-9f2b-de87da5eb6f0" 
        tabs={[{"title":"model","content":"from framework import Model\nimport numpy as np\nfrom pprint import pprint\n\nclass SimpleModel(Model):\n    \n    def __init__(self, mortality: np.ndarray):\n        super().__init__()\n        self.mortality = mortality\n    \n    def pols_if(self, t):\n        if t == 0:\n            return np.ones_like(self.mortality)\n        return self.pols_if(t-1) - self.pols_death(t-1)\n    \n    def pols_death(self, t):\n        return self.pols_if(t) * self.mortality\n        \n\nmodel = SimpleModel(np.linspace(.01, .1, 10))\nmodel.pols_if(5)\nprint(\"pols_if\")\npprint(model.pols_if.cache)"},{"title":"framework","content":"from collections import defaultdict\nfrom inspect import getmembers\nfrom types import MethodType\n\nclass Cache:\n    def __init__(self, func, shared_cache: dict):\n        self.func = func\n        self.cache = shared_cache[func.__name__]\n\n    def __call__(self, *arg): # does not support kwargs\n        if arg in self.cache:\n            return self.cache[arg]\n        else:\n            result = self.func(*arg)\n            self.cache[arg] = result\n            return result\n\nclass Model:\n    def __init__(self):\n        self.shared_cache = defaultdict(dict)\n        for method_name, method in getmembers(self):\n            if ( # do not cache these\n                not method_name[0].islower()\n                or method_name.startswith(\"_\")\n                or not isinstance(method, MethodType)\n            ):\n                continue\n            setattr(self, method_name, Cache(method, self.shared_cache))\n\n    def Clear(self):\n        self.shared_cache.clear()"}]} 
        packages={{official: ['numpy']}}/>
      </div>
      <FormattedMessage id={'share_world'} />
      <LinkButton href="https://www.linkedin.com/groups/13937070/" messageId='join_us' />
    </div>
  )
}
