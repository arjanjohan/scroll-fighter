import React from "react";
import { hardhat } from "viem/chains";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

/**
 * Site footer
 */
export const Footer = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {/* empty div so the SwitchTheme will be on the right */}
          </div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <a href="https://github.com/arjanjohan/scroll-fighter" target="_blank" rel="noreferrer" className="link">
                Fork me
              </a>
            </div>
            <span>·</span>
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block h-4 w-4" /> during
              </p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://dorahacks.io/hackathon/v0rtex-01/detail"
                target="_blank"
                rel="noreferrer"
              >
                <span className="link">Scroll VORTEx 1</span>
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a href="https://twitter.com/arjanjohan" target="_blank" rel="noreferrer" className="link">
                Twitter
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
