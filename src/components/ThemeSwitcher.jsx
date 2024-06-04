'use client'

import { Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaSun, FaMoon } from "react-icons/fa"

export function ThemeSwitcher(){
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div>
      {/* The current theme is: {theme} */}
      <Switch 
        defaultSelected={theme === 'dark'}
        size="lg"
        color="default"
        onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <FaMoon className={className} />
          ) : (
            <FaSun className={className} />
          )
        }
      >
        {/* Dark mode */}
      </Switch>
    </div>
  )
}