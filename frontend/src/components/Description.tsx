import React from "react";
import { Controls } from "./Controls";
import { Plots } from "./Plots";

interface Props {
  className: string;
}

export const Description: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex flex-col px-2 lg:px-4 pt-2 lg:pt-3">
        <p className="text-2xl xl:text-3xl font-bold">Segregation Model</p>
        <p className="mt-4 text-sm xl:text-base text-justify">
          TODO: Some description{" "}
          {/* This project models the behavior of two types of agents in a
          neighborhood. The orange agents and blue agents get along with one
          another. But each agent wants to make sure that it lives near some of
          "its own." That is, each orange agent wants to live near at least some
          orange agents, and each blue agent wants to live near at least some
          blue agents. The simulation shows how these individual preferences
          ripple through the neighborhood, leading to large-scale patterns. */}
          {/* <a
            className="font-bold"
            href="http://ccl.northwestern.edu/netlogo/models/Segregation"
            target="_black"
            rel="noopener"
          >
            Wilensky, U. (1997). NetLogo Segregation model
          </a> */}
        </p>
        <Controls className="mt-4" />
        <Plots className="mt-4" />
      </div>
    </div>
  );
};
