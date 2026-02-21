//
//  Tokens.swift
//  Generated file — do not edit manually
//

import UIKit
import SwiftUI

// MARK: - Color Tokens

public enum Tokens {

    // MARK: Semantic Colors

    public enum Color {

        public enum Background {
            public static let canvas = UIColor(hex: "#0A0B0D")
            public static let surface = UIColor(hex: "#16181D")
            public static let elevated = UIColor(hex: "#16181D")
        }

        public enum Text {
            public static let primary = UIColor(hex: "#F2F4F7")
            public static let secondary = UIColor(hex: "#CBD5E1")
            public static let tertiary = UIColor(hex: "#64748B")

            public static let tint = UIColor(hex: "#007AFF")
            public static let destructive = UIColor(hex: "#FF453A")
        }

        public enum Status {
            public static let success = UIColor(hex: "#00F5A0")
            public static let warning = UIColor(hex: "#FF9F0A")
            public static let error = UIColor(hex: "#FF453A")
            public static let info = UIColor(hex: "#00F2FF")
        }

        public enum Separator {
            public static let `default` = UIColor(hex: "#FFFFFF1A")
            public static let strong = UIColor(hex: "#FFFFFF26")
        }

        public enum Control {
            public enum Primary {
                public static let background = UIColor(hex: "#007AFF")
                public static let pressed = UIColor(hex: "#0068D9")
                public static let text = UIColor.white
            }

            public enum Secondary {
                public static let background = UIColor(hex: "#FFFFFF0D")
                public static let pressed = UIColor(hex: "#FFFFFF1A")
                public static let text = UIColor(hex: "#F2F4F7")
            }

            public enum Destructive {
                public static let background = UIColor(hex: "#FF453A")
                public static let pressed = UIColor(hex: "#D93A31")
                public static let text = UIColor.white
            }
        }

        public enum Data {
            public static let series1 = UIColor(hex: "#007AFF")
            public static let series2 = UIColor(hex: "#00F2FF")
            public static let series3 = UIColor(hex: "#00F5A0")
            public static let series4 = UIColor(hex: "#FF9F0A")
            public static let series5 = UIColor(hex: "#8B5CF6")
        }
    }

    // MARK: - Typography Tokens

    public enum Typography {

        public enum LargeTitle {
            public static let font = UIFont.systemFont(ofSize: 34, weight: .bold)
        }

        public enum Title1 {
            public static let font = UIFont.systemFont(ofSize: 28, weight: .semibold)
        }

        public enum Headline {
            public static let font = UIFont.systemFont(ofSize: 17, weight: .semibold)
        }

        public enum Body {
            public static let font = UIFont.systemFont(ofSize: 15, weight: .regular)
        }

        public enum Footnote {
            public static let font = UIFont.systemFont(ofSize: 13, weight: .medium)
        }

        public enum NumericMetric {
            public static let font = UIFont.monospacedSystemFont(ofSize: 34, weight: .semibold)
        }
    }

    // MARK: - Spacing Tokens

    public enum Spacing {
        public static let xs: CGFloat = 4
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 16
        public static let lg: CGFloat = 24
        public static let xl: CGFloat = 32
    }

    // MARK: - Radius Tokens

    public enum Radius {
        public static let control: CGFloat = 12
        public static let card: CGFloat = 16
        public static let sheet: CGFloat = 24
        public static let pill: CGFloat = 9999
    }

    // MARK: - Size Tokens

    public enum Size {
        public static let hitArea: CGFloat = 44
        public static let controlHeight: CGFloat = 44
        public static let controlCompactHeight: CGFloat = 36

        public enum Icon {
            public static let sm: CGFloat = 16
            public static let md: CGFloat = 20
            public static let lg: CGFloat = 24
        }
    }
}
