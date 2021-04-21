import React from "react";
import { Controls } from "./Controls";
import { Plots } from "./Plots";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

interface Props {
  className: string;
}

export const Description: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex flex-col px-2 lg:px-4 py-3 lg:pt-4">
        <p className="text-2xl xl:text-3xl font-bold">Segregation Model</p>
        <Disclosure
          as="div"
          className="mt-6 px-2 py-1 text-sm xl:text-base bg-gray-50 hover:bg-white rounded shadow"
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex justify-between items-center focus:outline-none">
                <span className="pl-1 font-medium">Description</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-gray-900`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transform origin-top transition duration-100 ease-out"
                enterFrom="opacity-0 scale-y-90"
                enterTo="opacity-100 scale-y-100"
                leave="transform origin-top transition duration-75 ease-out"
                leaveFrom="opacity-100 scale-y-100"
                leaveTo="opacity-0 scale-y-90"
              >
                <Disclosure.Panel static>
                  <p className="mt-2 text-justify">
                    This is an agent based simulation based on{" "}
                    <a
                      className="font-bold"
                      href="http://ccl.northwestern.edu/netlogo/models/Segregation"
                      target="_black"
                      rel="noopener"
                    >
                      Wilensky, U. (1997). NetLogo Segregation model
                    </a>
                    . Here we have two types of agents, each agent wants to live
                    near some agents of the same type (controlled by "Similarity
                    wanted"). At each tick the agents will move if they are not
                    happy based on the similarity wanted.
                  </p>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Controls className="mt-4" />
        <Plots className="mt-4" />
      </div>
    </div>
  );
};
