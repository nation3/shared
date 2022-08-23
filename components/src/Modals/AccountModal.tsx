import { LogoutIcon, UserIcon } from '@heroicons/react/outline'
import React from 'react'
import { TransparentButton } from '../Buttons'
import { Account } from '../Types'
import Modal from './Modal'

export default function AccountModal({
  account,
  onClose,
  onDisconnect,
}: {
  account: Account
  onClose: () => void
  onDisconnect?: () => void
}) {
  return (
    <Modal onClose={onClose}>
      <h3 className="px-4 text-lg font-bold">Account</h3>

      <p className="p-4">Connected to {account.connector?.name}</p>

      <ul className="p-2 -m-2 menu bg-base-100 rounded-box">
        <li key="address">
          <a
            href={`https://etherscan.io/address/${account.address}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <TransparentButton>
              <div className="px-3">
                <UserIcon className="w-5 h-5" />
              </div>
              {account.ensName
                ? account.ensName
                : `${((account.address as string) ?? '').substring(0, 6)}...${(
                    (account.address as string) ?? ''
                  ).slice(-4)}`}
            </TransparentButton>
          </a>
        </li>

        {onDisconnect && (
          <li key="logout">
            <TransparentButton onClick={() => onDisconnect()}>
              <div className="px-3">
                <LogoutIcon className="w-5 h-5" />
              </div>
              Log out
            </TransparentButton>
          </li>
        )}
      </ul>
    </Modal>
  )
}
