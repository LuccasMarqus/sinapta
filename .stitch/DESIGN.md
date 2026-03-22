# Sinapta Design System

## 1. Brand Identity
**Company:** Sinapta — Empresa de Tecnologia Brasileira  
**Tagline:** INNOVATE · CONNECT · GROW  
**Positioning:** "A empresa de tecnologia que conecta inovação com resultado."  
**Vibe:** Enterprise Dark Premium — authoritative, modern, energetic, trustworthy.

## 2. Color Palette
| Role | Hex |
|---|---|
| Background Deep | `#0A1628` |
| Background Alt | `#0D1F3C` |
| Micro-bar BG | `#050D1A` |
| Card Background | `#1E293B` |
| Electric Blue (Primary) | `#00A3FF` |
| Orange (Accent start) | `#F97316` |
| Gold (Accent end) | `#FBBF24` |
| Royal Purple | `#7C3AED` |
| White | `#FFFFFF` |
| Cool Gray | `#CBD5E1` |
| Border Subtle | `#334155` |

**Signature Gradient:** `linear-gradient(135deg, #00A3FF 0%, #7C3AED 50%, #F97316 100%)`  
**CTA Gradient (Orange):** `linear-gradient(135deg, #F97316 0%, #FBBF24 100%)`  
**Blue Glow:** `0 0 30px rgba(0,163,255,0.3), 0 0 60px rgba(0,163,255,0.15)`  
**Orange Glow:** `0 0 30px rgba(249,115,22,0.4)`

## 3. Typography
| Element | Font | Weight | Size |
|---|---|---|---|
| H1 Hero | Inter / Manrope | 900 | 72–96px, UPPERCASE |
| H2 Section | Inter | 800 | 48–56px |
| H3 Card | Inter | 700 | 24–28px |
| Body | Inter | 400 | 16px, line-height 1.7 |
| Badge | Inter | 600 | 12px, UPPERCASE |

## 4. Component Styles
- **Primary Button (Orange):** gradient #F97316→#FBBF24, border-radius 50px, padding 16px 36px, color #0A1628
- **Secondary Button (Blue):** gradient #00A3FF→#7C3AED, same shape, color white
- **Outline Button:** border 2px solid white, transparent bg, color white  
- **Cards:** bg #1E293B, border 1px solid #334155, radius 16px, hover: translateY(-4px) + blue glow
- **Badges:** bg rgba(0,163,255,0.15), border rgba(0,163,255,0.3), color #00A3FF, radius 50px
- **Navbar scrolled:** bg rgba(10,22,40,0.85), backdrop-filter blur(20px)

## 5. Animations
- Particle network dots with blue connection lines
- Counter animation: count up from 0 on scroll, 1.5s ease-out
- Scroll fade-in: opacity 0→1 + translateY 30px→0
- Hover parallax: perspective 1000px, rotateX±5deg
- Glow pulse keyframe on CTAs
- Orbit animation for ecosystem diagram

## 6. Design System Notes for Stitch Generation

```
Dark enterprise landing page for Sinapta, Brazilian tech company.

DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first (responsive to 320px)
- Palette: Navy Abyss (#0A1628) background, Electric Blue (#00A3FF) primary, Orange-Gold (#F97316→#FBBF24) CTAs, Royal Purple (#7C3AED) accent
- Styles: Rounded cards (border-radius 16px), glassmorphic sticky navbar, glowing CTAs, dark premium enterprise feel
- Typography: Inter Black 900 UPPERCASE headlines, Inter Regular 400 body at 1.7 line-height
- Effects: Animated particle network background, glow effects on cards/buttons, scroll-triggered counter animations, fade-in on scroll
```
